import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { AuthRequestDTO } from './dto/auth.dto'
import { AuthInfo } from './auth.schema'
import { AuthService } from './auth.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Authenticate user using 5 digits code' })
  @ApiResponse({ status: 200, description: 'Authenticate Success' })
  @ApiResponse({ status: 401, description: 'Authenticate fail' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  auth(@Body() request: AuthRequestDTO): Promise<AuthInfo> {
    return this.authService.auth(request)
  }
}
