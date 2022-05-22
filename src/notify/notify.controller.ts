import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MessageDto } from './dto/notify.dto'
import { NotifyService } from './notify.service'

@Controller('notify')
@ApiTags('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Send Message Notification' })
  @ApiResponse({ status: 200, description: 'Send success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async sendNotify(@Body() payload: MessageDto): Promise<any> {
    return await this.notifyService.sendMsg(payload.message)
  }
}
