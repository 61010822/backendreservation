import { Module } from '@nestjs/common'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { FirebaseAuthStrategy } from './firebaseauth.strategy'

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthStrategy]
})
export class AuthModule {}
