import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CompetitorService } from './competitor.service'
import { CompetitorDto } from './dto/competitor.dto'
import { CompetitorEntity } from './competitor.schema'

const MODULE_NAME = 'competitor'

@ApiTags(MODULE_NAME)
@Controller(MODULE_NAME)
export class CompetitorController {
  constructor(private readonly competitorService: CompetitorService) {}

  @Get()
  getCompetitor(): any {
    return this.competitorService.getCompetitor()
  }

  @Post('create')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Create competitor and generate random 5 digits code'
  })
  @ApiResponse({ status: 200, description: 'Create Success' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: please check missing parameter'
  })
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() competitor: CompetitorDto): Promise<CompetitorEntity> {
    return this.competitorService.createCompetitor(competitor)
  }
}
