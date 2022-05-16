import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { FirestoreModule } from './common/firestore/firestore.module'
import { AuthModule } from './authentication/auth.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MenuModule } from './menu/menu.module'

@Module({
  imports: [FirestoreModule, MenuModule, AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
