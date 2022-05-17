import {
  Body,
  Request,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  Param,
  Put,
  Query,
  Delete
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { Response } from 'express'

import { OrderService } from './order.service'
import { OrderCreate, OrderId } from './dto/order.dto'
import { FirestoreService } from '../common/firestore/firestore.service'
import {
  AdminAuthGuard,
  FirebaseAuthGuard
} from '../authentication/firebaseauth.guard'
import { firestore } from 'firebase-admin'
import { FirestoreInterceptor } from '../common/interceptors/firestore.interceptor'
import { MenuID, MenuPayload } from '../menu/dto/menu.dto'
import WriteResult = firestore.WriteResult

@Controller('order')
@ApiTags('Order')
@UseInterceptors(FirestoreInterceptor)
export class OrderController {
  constructor(
    private orderService: OrderService,
    private firestore: FirestoreService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get list of order' })
  @ApiResponse({ status: 200, description: 'Read success' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async get(@Res({ passthrough: true }) res: Response): Promise<any[]> {
    const content = await this.orderService.get()

    if (!content.length) res.status(HttpStatus.NO_CONTENT)

    return content
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Order by ID' })
  @ApiResponse({ status: 200, description: 'Read success' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async getById(@Param('id') id: String): Promise<any> {
    return await this.orderService.getById(id)
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create Order' })
  @ApiResponse({ status: 200, description: 'Create success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  async create(
    @Request() { user },
    @Body() payload: OrderCreate
  ): Promise<any> {
    const checkIfMenusExist = payload.menu_list.map((m) =>
      this.firestore.isDocumentExist('menu', m)
    )

    await Promise.all(checkIfMenusExist)

    const attachment = {
      status: 'On Process',
      user: user.uid,
      createdDate: firestore.Timestamp.now()
    }

    return await this.orderService.create({ ...payload, ...attachment })
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update Order by ID' })
  @ApiResponse({ status: 200, description: 'Update success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Permission Denied' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: String,
    @Body() payload: OrderCreate
  ): Promise<WriteResult> {
    const checkIfMenusExist = payload.menu_list.map((m) =>
      this.firestore.isDocumentExist('menu', m)
    )

    await Promise.all(checkIfMenusExist)

    return this.orderService.update(id, payload)
  }

  @Delete()
  @ApiOperation({ summary: 'Delete order by id' })
  @ApiResponse({ status: 200, description: 'Delete success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Permission Denied' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async delete(@Query() req: OrderId): Promise<WriteResult> {
    return this.orderService.delete(req.id)
  }

  @Post('done-order')
  @HttpCode(200)
  @ApiOperation({ summary: 'Chane order status to done' })
  @ApiResponse({ status: 200, description: 'Update success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Permission Denied' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async doneOrder(@Body() payload: OrderId): Promise<WriteResult> {
    return this.orderService.doneOrder(payload.id)
  }
}
