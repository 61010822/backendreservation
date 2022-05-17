import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { map } from 'rxjs'
import { keys } from 'lodash'
import { firestore } from 'firebase-admin'
import * as dayjs from 'dayjs'

const objectProcess = (data) => {
  const result = { ...data }

  // check if value is Timestamp
  keys(result).map((k) => {
    if (result[k] instanceof firestore.Timestamp) {
      result[k] = dayjs(result[k].toDate()).format()
    } else if (Array.isArray(result[k])) {
      result[k] = result[k].filter((a) => Boolean(a))
    }
  })

  return result
}

@Injectable()
export class FirestoreInterceptor implements NestInterceptor {
  dataPostProcess(data) {
    if (Array.isArray(data)) return data.map(objectProcess)
    else {
      return objectProcess(data)
    }
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map(this.dataPostProcess))
  }
}
