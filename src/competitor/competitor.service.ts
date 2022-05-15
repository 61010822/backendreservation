import { Injectable } from '@nestjs/common'
import * as dayjs from 'dayjs'

import { FirestoreService } from '../common/firestore/firestore.service'
import { CompetitorDto } from './dto/competitor.dto'
import { CompetitorEntity } from './competitor.schema'

@Injectable()
export class CompetitorService {
  constructor(private firestore: FirestoreService) {}

  getCompetitor(): any {
    console.log('env', process.env.NEST_ENV)
    return {
      message: 'success',
      name: 'นายภากร ศุภนิมิตวาสนา',
      pass_code: '55204'
    }
  }

  async createCompetitor(user: CompetitorDto): Promise<CompetitorEntity> {
    await this.firestore.isDocumentExist('exams', user.exam.id)

    const year = dayjs().year()
    const passcode = await this.generatePassword()

    const competitors = {
      ...user,
      exam: user.exam,
      passcode,
      year
    }

    delete competitors.examId

    const result = await this.firestore.addDocument('competitors', competitors)

    return new CompetitorEntity(result)
  }

  async generatePassword(): Promise<string> {
    const year = dayjs().year()

    const allPasscode = (
      await this.firestore.getDocumentsList(
        'competitors',
        [{ field: 'year', opStr: '==', value: year }],
        1000
      )
    ).map((d) => d.passcode)

    let passcode

    do {
      const charset =
        allPasscode.length > 999
          ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
          : '0123456789'
      passcode = this.generateByCharset(charset, 5)
    } while (allPasscode.includes(passcode))

    return passcode
  }

  generateByCharset = (charset, length) => {
    let result = ''
    const charsetLen = charset.length
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charsetLen))
    }
    return result
  }
}
