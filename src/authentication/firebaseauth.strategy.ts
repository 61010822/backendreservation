import { Injectable } from '@nestjs/common'

import { ExtractJwt, Strategy } from 'passport-firebase-jwt'
import { PassportStrategy } from '@nestjs/passport'

import { AuthService } from './auth.service'

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth'
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(token: string) {
    return await this.authService.validateToken(token)
  }
}
