import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { firestore } from 'firebase-admin'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { Response } from 'express'

import { MenuService } from './menu.service'
import { MenuID, MenuPayload } from './dto/menu.dto'
import { MenuType } from './menu.schema'

import WriteResult = firestore.WriteResult
import { AdminAuthGuard } from '../authentication/firebaseauth.guard'
import { FirestoreInterceptor } from '../common/interceptors/firestore.interceptor'

@Controller('menu')
@ApiTags('Menu')
@UseInterceptors(FirestoreInterceptor)
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create menu' })
  @ApiResponse({ status: 200, description: 'Create success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Permission Denied' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async create(@Body() payload: MenuPayload): Promise<MenuType> {
    return this.menuService.create(payload)
  }

  @Get()
  @ApiOperation({ summary: 'Get list of menu' })
  @ApiResponse({ status: 200, description: 'Read success' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async get(@Res({ passthrough: true }) res: Response): Promise<MenuType[]> {
    const content = await this.menuService.get()

    if (!content.length) res.status(HttpStatus.NO_CONTENT)

    return content
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get menu by ID' })
  @ApiResponse({ status: 200, description: 'Read success' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getById(@Param('id') id: String): Promise<any> {
    return await this.menuService.getById(id)
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update Menu by ID' })
  @ApiResponse({ status: 200, description: 'Update success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Permission Denied' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async Update(
    @Param('id') id: String,
    @Body() payload: MenuPayload
  ): Promise<WriteResult> {
    return this.menuService.update(id, payload)
  }

  @Delete()
  @ApiOperation({ summary: 'Delete menu by id' })
  @ApiResponse({ status: 200, description: 'Delete success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Permission Denied' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  async delete(@Query() req: MenuID): Promise<WriteResult> {
    return this.menuService.delete(req.id)
  }
}
