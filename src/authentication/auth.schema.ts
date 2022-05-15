export class AuthInfo {
  access_token: string
  code: string
  userId: string
  examId: string
  isAnonymous: boolean
}

export class AuthRequest {
  code: string
}
