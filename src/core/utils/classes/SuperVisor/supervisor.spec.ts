import { testAdmin } from '../User/user.spec'

import { SuperVisor } from './index'

describe('SuperVisorClass', () => {
  it("Should get SuperVisor's role", () => {
    const user: SuperVisor = new SuperVisor(testAdmin)

    expect(user.fullName).toBe('นายภูรี กานุสนธิ์')
    expect(user.role).toBe('supervisor')
  })
})
