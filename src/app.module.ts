import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { FirestoreModule } from './common/firestore/firestore.module'
import { AuthModule } from './authentication/auth.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MenuModule } from './menu/menu.module'
import { OrderModule } from './order/order.module'

@Module({
  imports: [
    FirestoreModule,
    AuthModule,
    OrderModule,
    MenuModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
