import {
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException
} from '@nestjs/common'
import * as dayjs from 'dayjs'
import * as admin from 'firebase-admin'

import { FirestoreService } from '../common/firestore/firestore.service'
import { AuthInfo } from './auth.schema'
import { AuthRequestDTO } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(private firestore: FirestoreService) {}

  async auth(request: AuthRequestDTO): Promise<AuthInfo> {
    const { v4: uuidv4 } = require('uuid')

    const passcode = request.code
    const pm_user_id = uuidv4()
    let isAnonymous = false

    try {
      const user = await this.firestore.getDocument('competitors', [
        {
          field: 'passcode',
          opStr: '==',
          value: passcode
        },
        {
          field: 'year',
          opStr: '==',
          value: dayjs().year()
        },
        {
          field: 'active',
          opStr: '==',
          value: false
        }
      ])

      let exam =
        user?.exam && (await this.firestore.getDocumentByRef(user.exam))

      if (!exam) {
        exam = await this.firestore.getDocument('exams', [
          {
            field: 'permanentCodes',
            opStr: 'array-contains',
            value: passcode
          }
        ])

        isAnonymous = true
      }

      this.isTestAllow(user, exam)

      const userId = isAnonymous ? pm_user_id : user.id

      const access_token = await this.generateToken(userId, passcode)

      await this.firestore.setDocumentById('competitors', userId, {
        active: true,
        passcode,
        testedAt: admin.firestore.Timestamp.fromDate(dayjs().toDate())
      })

      return {
        access_token,
        userId,
        code: passcode,
        examId: exam.id,
        isAnonymous
      }
    } catch (error) {
      if (error) throw error
      throw new ServiceUnavailableException()
    }
  }

  isTestAllow(user, exam) {
    if (!user && !exam) throw new UnauthorizedException()
  }

  async generateToken(id, code) {
    try {
      return await admin.auth().createCustomToken(id, {
        code: code
      })
    } catch (error) {
      throw new UnauthorizedException(
        'Error: on creating custom token, ' + error
      )
    }
  }
}
