import { authStub } from '../test/stubs/authStub'

export const mockAuthService = {
  auth: jest.fn(() => authStub(false))
}
