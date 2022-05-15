import { testCompetitor } from '../User/user.spec'

import { Competitor } from './index'

describe('CompetitorClass', () => {
  it('Should get Competitor with set supervisor phone and time participated', () => {
    const user: Competitor = new Competitor({
      ...testCompetitor,
      supervisor_phone: '0988888881',
      time_participated: 4
    })

    expect(user.role).toBe('competitor')
    expect(user.time_participated).toBe(4)
    expect(user.supervisor_phone).toBe('0988888881')
  })

  it("Should get Competitor's role", () => {
    const user: Competitor = new Competitor({
      ...testCompetitor,
      supervisor_phone: '0988888888'
    })

    expect(user.fullName).toBe('นายภากร ศุภนิมิตวาสนา')
    expect(user.role).toBe('competitor')
    expect(user.time_participated).toBe(0)
    expect(user.supervisor_phone).toBe('0988888888')
  })
})
