import { User } from '../User'

export class SuperVisor extends User {
  private readonly _role: String = 'supervisor'

  get role (): String {
    return this._role
  }
}
