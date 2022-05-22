import { BadRequestException, Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'

import { FirestoreService } from '../common/firestore/firestore.service'
import { CreateUserRequest, SetAdminRequest } from './dto/auth.dto'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(private firestore: FirestoreService) {}

  async setAdmin(request: SetAdminRequest, res: Response) {
    const auth = admin.auth()

    try {
      await auth.setCustomUserClaims(request.id, { admin: true })

      return {
        message: `set admin at ${request.id} success full`
      }
    } catch (error) {
      res.status(400)

      return error
    }
  }

  async create(id: String, payload: CreateUserRequest) {
    try {
      return await this.firestore.setDocumentById('user', id, payload)
    } catch (e) {
      throw e
    }
  }

  async validateToken(token: string): Promise<any> {
    const auth = admin.auth()

    try {
      return await auth.verifyIdToken(token)
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  async getMe(uid: String): Promise<any> {
    const ref = this.firestore.createReferenceByID('user', uid)

    return await this.firestore.getDocumentByRef(ref)
  }

  async getById(uid: String): Promise<any> {
    const ref = this.firestore.createReferenceByID('user', uid)

    const auth = admin.auth()

    const userRecord = await auth.getUser(uid as string)
    const userData = await this.firestore.getDocumentByRef(ref)

    return {
      ...userData,
      isAdmin: Boolean(userRecord.customClaims?.admin)
    }
  }
}
