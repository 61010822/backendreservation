import { Exclude } from 'class-transformer'
import { UserType } from '../core/utils/classes/User'

export class CompetitorEntity {
  name: String
  id: String
  passcode: String

  @Exclude()
  exam: any

  constructor(competitor: UserType) {
    this.id = competitor.id
    this.name = `${competitor.prefix}${competitor.fname} ${competitor.lname}`
    this.passcode = competitor.passcode
  }
}
