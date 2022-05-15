export interface UserType {
  id: String
  prefix: String
  fname: String
  age: number
  lname: String
  nname: String

  address?: String | undefined
  affiliation?: String | undefined
  district?: String | undefined
  line?: String | undefined
  phone?: String | undefined
  supervisor_phone?: String | undefined
  time_participated?: number | undefined
  postal?: String | undefined
  province?: String | undefined
  sub_district?: String | undefined
  testimonial?: String | undefined

  active?: boolean
  passcode?: String
}

export interface Contact {
  line?: String
  phone?: String
}

export class User {
  private readonly _id: String
  private readonly _prefix: String
  private readonly _fname: String
  private readonly _age: number
  private readonly _lname: String
  private readonly _nname: String

  private readonly _address: String | undefined
  private readonly _affiliation: String | undefined
  private readonly _district: String | undefined
  private readonly _line: String | undefined
  private readonly _phone: String | undefined
  private readonly _postal: String | undefined
  private readonly _province: String | undefined
  private readonly _sub_district: String | undefined
  private readonly _testimonial: String | undefined

  constructor(user: UserType) {
    this._id = user.id
    this._prefix = user.prefix
    this._fname = user.fname
    this._age = user.age
    this._lname = user.lname
    this._nname = user.nname
    this._address = user.address
    this._affiliation = user.affiliation
    this._district = user.district
    this._line = user.line
    this._phone = user.phone
    this._postal = user.postal
    this._province = user.province
    this._sub_district = user.sub_district
    this._testimonial = user.testimonial
  }

  get id(): String {
    return this._id
  }

  get prefix(): String {
    return this._prefix
  }

  get firstName(): String {
    return this._fname
  }

  get age(): number {
    return this._age
  }

  get lastName(): String {
    return this._lname
  }

  get nickName(): String {
    return this._nname
  }

  get address(): String | undefined {
    return this._address
  }

  get affiliation(): String | undefined {
    return this._affiliation
  }

  get district(): String | undefined {
    return this._district
  }

  get line(): String | undefined {
    return this._line
  }

  get postal(): String | undefined {
    return this._postal
  }

  get province(): String | undefined {
    return this._province
  }

  get sub_district(): String | undefined {
    return this._sub_district
  }

  get testimonial(): String | undefined {
    return this._testimonial
  }

  get phone(): String | undefined {
    return this._phone
  }

  get fullName(): String {
    const { _prefix, _fname, _lname } = this
    return `${_prefix}${_fname} ${_lname}`
  }

  get name(): String {
    const { _fname, _lname } = this
    return `${_fname} ${_lname}`
  }

  get fullAddress(): String {
    const {
      _affiliation,
      _address,
      _sub_district,
      _province,
      _district,
      _postal
    } = this

    const affiliation = _affiliation ? `${_affiliation}, ` : ''
    const sub_district = _sub_district ? ` แขวง${_sub_district}` : ''
    const district = _district ? ` เขต${_district}` : ''
    const province = _province ? ` ${_province}` : ''
    const postal = _postal ? ` ${_postal}` : ''
    const formattedAddress = _address ? `${_address}` : ''

    const address = `${affiliation}${formattedAddress}${sub_district}${district}${province}${postal}`

    return address || 'ไม่มีข้อมูลที่อยู่'
  }

  get contact(): Contact {
    const result: Contact = {}

    this._line && (result.line = this._line)
    this._phone && (result.phone = this._phone)

    return result
  }
}
