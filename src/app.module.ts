import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { FirestoreModule } from './common/firestore/firestore.module'
import { AuthModule } from './authentication/auth.module'
import { CompetitorModule } from './competitor/competitor.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    FirestoreModule,
    AuthModule,
    CompetitorModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
