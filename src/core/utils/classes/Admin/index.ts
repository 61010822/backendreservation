import { User } from '../User'

export class Admin extends User {
  private readonly _role: String = 'admin'

  get role (): String {
    return this._role
  }
}
