import {
  Body,
  Request,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Param,
  Res,
  UseInterceptors
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'

import { firestore } from 'firebase-admin'
import WriteResult = firestore.WriteResult

import { CreateUserRequest, SetAdminRequest } from './dto/auth.dto'
import { AuthService } from './auth.service'
import { User } from './auth.schema'
import { AdminAuthGuard, FirebaseAuthGuard } from './firebaseauth.guard'
import { Response } from 'express'
import { FirestoreInterceptor } from '../common/interceptors/firestore.interceptor'

@UseInterceptors(FirestoreInterceptor)
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/admin')
  @HttpCode(200)
  @ApiOperation({ summary: 'Set Admin By ID' })
  @ApiResponse({ status: 200, description: 'Set Admin Success' })
  @ApiResponse({ status: 401, description: 'Permission Denied' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  setAdmin(
    @Body() request: SetAdminRequest,
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    return this.authService.setAdmin(request, res)
  }

  @Post('user/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, description: 'Create user success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Permission Denied' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(
    @Param('id') id: String,
    @Body() payload: CreateUserRequest
  ): Promise<WriteResult> {
    return this.authService.create(id, payload)
  }

  @Get('/me')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get Current User' })
  @ApiResponse({ status: 200, description: 'Get User Profile by token' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Permission Denied' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  async getMe(@Request() req): Promise<User> {
    const { user } = req
    const result = await this.authService.getMe(user.uid)

    return { ...result, isAdmin: Boolean(user.admin) }
  }
}
