import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class NotifyService {
  async sendMsg(message: String) {
    const FormData = require('form-data')
    const token = 'bv4xGv5s5sK8aGe25UbuWqaPAnWNh7ecTT7OZDUMAxF'

    const form = new FormData()
    form.append('message', message as string)

    const options = {
      method: 'POST',
      url: 'https://notify-api.line.me/api/notify',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      data: form
    }

    try {
      const response: any = await axios.request(options)
      return response.data
    } catch (e) {
      return e
    }
  }
}
