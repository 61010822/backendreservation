import { User, UserType } from '../User'

export class Competitor extends User {
  private readonly _role: String = 'competitor'
  private readonly _time_participated: number = 0
  private readonly _supervisor_phone: String | undefined

  get role (): String {
    return this._role
  }

  constructor (user: UserType) {
    super(user)
    this._time_participated = user.time_participated || 0
    this._supervisor_phone = user.supervisor_phone
  }

  get time_participated (): number {
    return this._time_participated
  }

  get supervisor_phone (): String | undefined {
    return this._supervisor_phone
  }
}
