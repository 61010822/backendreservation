import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {

    return 'Hello World! Reservation ' + process.env.NODE_ENV
  }
}
