import { Test, TestingModule } from '@nestjs/testing'

import { authStub } from './stubs/authStub'

import { mockAuthService } from '../__mock__/auth.service'
import { AuthController } from '../auth.controller'
import { AuthService } from '../auth.service'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be define', () => {
    expect(controller).toBeDefined()
  })

  it('should be authen by code', () => {
    expect(controller.auth({ code: '00000' })).toEqual(authStub(false))
  })
})
