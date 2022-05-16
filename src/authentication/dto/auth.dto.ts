import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator'

export class SetAdminRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  id: string
}

export class CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  first_name: String

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  last_name: String

  @IsNotEmpty()
  @IsMobilePhone('th-TH')
  @ApiProperty({ type: String })
  phone: String

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email: String
}
