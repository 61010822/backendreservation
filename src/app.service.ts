import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    console.log('cors', process.env.CORS_ALLOW)

    return 'Hello World!'
  }
}
