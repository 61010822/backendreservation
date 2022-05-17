import { Injectable } from '@nestjs/common'
import { firestore } from 'firebase-admin'

import { FirestoreService } from '../common/firestore/firestore.service'
import { Order } from './order.schema'

const META_ID = 'R0FKjTuJbYK0AUcP7A1w'

@Injectable()
export class OrderService {
  constructor(private firestore: FirestoreService) {}

  async get() {
    return this.firestore.getDocumentsList('order')
  }

  async create(payload) {
    try {
      const result = await this.firestore.addDocument('order', payload)

      await this.firestore.setDocumentById('meta', META_ID, {
        total_docs: firestore.FieldValue.increment(1)
      })

      return result
    } catch (e) {
      throw e
    }
  }

  async getById(id: String) {
    const ref = this.firestore.createReferenceByID('order', id)

    const result: Order = await this.firestore.getDocumentByRef(ref)

    const refs = result.menu_list.map((m) =>
      this.firestore.createReferenceByID('menu', m)
    )

    result.menu_list = await Promise.all(
      refs.map((r) => this.firestore.getDocumentByRef(r, false))
    )

    return result
  }

  async delete(id: String) {
    await this.firestore.isDocumentExist('order', id)
    try {
      const result = await this.firestore.deleteById('order', id)

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
    payload: Partial<Order>
  ): Promise<firestore.WriteResult> {
    await this.firestore.isDocumentExist('order', id)

    return await this.firestore.updateDocumentByID('order', id, payload)
  }

  async doneOrder(id: String): Promise<firestore.WriteResult> {
    await this.firestore.isDocumentExist('order', id)

    return await this.firestore.updateDocumentByID('order', id, {
      status: 'Done'
    })
  }
}
