import { UserType, User } from './index'

export const testAdmin: UserType = {
  id: 'PH101',
  prefix: 'นาย',
  fname: 'ภูรี',
  lname: 'กานุสนธิ์',
  age: 23,
  nname: 'โยระ'
}

export const testCompetitor: UserType = {
  id: 'PH102',
  prefix: 'นาย',
  fname: 'ภากร',
  lname: 'ศุภนิมิตวาสนา',
  age: 23,
  nname: 'กร',

  affiliation: 'Love Peach Studio',
  address: '32/98 อ่อนนุช 80 แยก 5',
  district: 'ประเวศ',
  line: 'l1234',
  phone: '0948888888',
  postal: '10250',
  province: 'กรุงเทพมหานคร',
  sub_district: 'ประเวศ',
  testimonial: 'ยินดีและดีใจมากที่ได้เป็นส่วนหนึ่งในการ'
}

describe('UserClass', () => {
  it("Should get User's object when provide needed props", () => {
    const user = new User(testAdmin)

    expect(user.id).toBe('PH101')
    expect(user.prefix).toBe('นาย')
    expect(user.firstName).toBe('ภูรี')
    expect(user.lastName).toBe('กานุสนธิ์')
    expect(user.nickName).toBe('โยระ')
    expect(user.age).toBe(23)

    expect(user.fullName).toBe('นายภูรี กานุสนธิ์')
    expect(user.name).toBe('ภูรี กานุสนธิ์')
    expect(user.fullAddress).toBe('ไม่มีข้อมูลที่อยู่')
    expect(user.contact).toStrictEqual({})
  })

  it("Should get User's object when provide fully custom props", () => {
    const user: User = new User(testCompetitor)

    expect(user.id).toBe('PH102')
    expect(user.prefix).toBe('นาย')
    expect(user.firstName).toBe('ภากร')
    expect(user.lastName).toBe('ศุภนิมิตวาสนา')
    expect(user.nickName).toBe('กร')
    expect(user.age).toBe(23)

    expect(user.affiliation).toBe('Love Peach Studio')
    expect(user.address).toBe('32/98 อ่อนนุช 80 แยก 5')
    expect(user.district).toBe('ประเวศ')
    expect(user.line).toBe('l1234')
    expect(user.phone).toBe('0948888888')
    expect(user.postal).toBe('10250')
    expect(user.province).toBe('กรุงเทพมหานคร')
    expect(user.sub_district).toBe('ประเวศ')
    expect(user.testimonial).toBe('ยินดีและดีใจมากที่ได้เป็นส่วนหนึ่งในการ')

    expect(user.fullName).toBe('นายภากร ศุภนิมิตวาสนา')
    expect(user.name).toBe('ภากร ศุภนิมิตวาสนา')
    expect(user.fullAddress).toBe(
      'Love Peach Studio, 32/98 อ่อนนุช 80 แยก 5 แขวงประเวศ เขตประเวศ กรุงเทพมหานคร 10250'
    )
    expect(user.contact).toStrictEqual({ phone: '0948888888', line: 'l1234' })
  })

  it('no affiliation address', () => {
    const user: User = new User({
      id: 'PH103',
      prefix: 'นาย',
      fname: 'A',
      lname: 'ABC',
      age: 23,
      nname: 'A',

      address: 'ถนนพัฒนาการ อ่อนนุช',
      district: 'วัฒนา',
      line: 'l1234',
      phone: '0948888888',
      postal: '10250',
      province: 'กรุงเทพมหานคร',
      sub_district: 'วัฒนา'
    })

    expect(user.fullAddress).toBe(
      'ถนนพัฒนาการ อ่อนนุช แขวงวัฒนา เขตวัฒนา กรุงเทพมหานคร 10250'
    )
  })
})
