import { Module } from '@nestjs/common'
import { CompetitorController } from './competitor.controller'
import { CompetitorService } from './competitor.service'

@Module({
  imports: [],
  controllers: [CompetitorController],
  providers: [CompetitorService]
})
export class CompetitorModule {}
