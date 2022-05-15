import { testAdmin } from '../User/user.spec'

import { Admin } from './index'

describe('AdminClass', () => {
  it("Should get Admin's role", () => {
    const user: Admin = new Admin(testAdmin)

    expect(user.fullName).toBe('นายภูรี กานุสนธิ์')
    expect(user.role).toBe('admin')
  })
})
