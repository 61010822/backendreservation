import { Injectable } from '@nestjs/common'
import { firestore } from 'firebase-admin'

import { FirestoreService } from '../common/firestore/firestore.service'
import { MenuPayload } from './dto/menu.dto'
import { MenuType } from './menu.schema'

const META_ID = 'AII7tu28lRPdmJ1wFPXQ'

@Injectable()
export class MenuService {
  constructor(private firestore: FirestoreService) {}

  async get() {
    return await this.firestore.getDocumentsList('menu')
  }

  async getById(id: String) {
    const ref = this.firestore.createReferenceByID('menu', id)

    return await this.firestore.getDocumentByRef(ref)
  }

  async create(payload: MenuPayload) {
    try {
      const result: MenuType = await this.firestore.addDocument('menu', payload)

      await this.firestore.setDocumentById('meta', META_ID, {
        total_docs: firestore.FieldValue.increment(1)
      })

      return result
    } catch (e) {
      throw e
    }
  }

  async delete(id: String) {
    await this.firestore.isDocumentExist('menu', id)
    try {
      const result = await this.firestore.deleteById('menu', id)

      await this.firestore.setDocumentById('meta', META_ID, {
        total_docs: firestore.FieldValue.increment(-1)
      })

      return result
    } catch (e) {
      throw e
    }
  }

  async update(
    id: String,
    payload: MenuPayload
  ): Promise<firestore.WriteResult> {
    const editedPayload: any = {
      ...payload
    }

    if (!editedPayload.thumbnail)
      editedPayload.thumbnail = firestore.FieldValue.delete()

    await this.firestore.isDocumentExist('menu', id)

    return await this.firestore.updateDocumentByID('menu', id, payload)
  }
}
