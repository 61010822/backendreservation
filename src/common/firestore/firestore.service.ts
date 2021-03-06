import { BadRequestException, Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'

import { firestore } from 'firebase-admin'
import DocumentReference = firestore.DocumentReference
import { queryCondition } from './firestore.schema'

@Injectable()
export class FirestoreService {
  async getDocument(collection: String, conditions: queryCondition[] = []) {
    let doc

    const ref = this.createReference(collection, conditions)

    const docs = await ref.get()
    docs.forEach((d) => {
      doc = {
        id: d.id,
        ...d.data()
      }
    })

    return doc
  }

  async deleteById(
    collection: String,
    id: String
  ): Promise<firestore.WriteResult> {
    const ref = this.createReferenceByID(collection, id)

    return await ref.delete()
  }

  getFirestore() {
    return admin.firestore()
  }

  createReference(collection, conditions = [], limit?) {
    const db = admin.firestore()

    let ref: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      db.collection(collection)

    conditions.map((c) => {
      ref = ref.where(c.field, c.opStr, c.value)

      return
    })

    if (limit) ref.limit(limit)

    return ref
  }

  createReferenceByID(collection, id) {
    const db = admin.firestore()

    return db.collection(collection).doc(id)
  }

  async getDocumentsList(
    collection: String,
    conditions?: queryCondition[],
    limit?
  ): Promise<Array<any>> {
    const ref = this.createReference(collection, conditions, limit)

    const docs = await ref.get()

    return docs.docs.map((d) => {
      return {
        id: d.id,
        ...d.data()
      }
    })
  }

  async isDocumentExist(collection: String, id: String) {
    const ref = this.createReferenceByID(collection, id)

    if ((await ref.get()).exists) {
      return true
    } else
      throw new BadRequestException(
        `id: ${id} is not exist in ${collection} collection`
      )
  }

  async getDocumentByRef(
    ref: DocumentReference,
    errorOnNotExist = true
  ): Promise<any> {
    const doc = await ref.get()

    if (!doc.exists) {
      if (errorOnNotExist) {
        throw new BadRequestException('Document does not exists')
      } else {
        return undefined
      }
    }

    return {
      id: doc.id,
      ...doc.data()
    }
  }

  async setDocumentById(collection, id, payload) {
    const ref = this.createReferenceByID(collection, id)

    return await ref.set(payload, { merge: true })
  }

  async addDocument(collection, payload) {
    const db = admin.firestore()
    const ref = db.collection(collection).doc()

    await ref.create(payload)

    return { id: ref.id, ...payload }
  }

  async updateDocumentByID(
    collection: String,
    id: String,
    payload
  ): Promise<firestore.WriteResult> {
    const ref = this.createReferenceByID(collection, id)

    return await ref.update(payload)
  }
}
