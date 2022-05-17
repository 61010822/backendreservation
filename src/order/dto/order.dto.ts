import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class OrderCreate {
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty()
  menu_list: String[]
}

export class OrderId {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: String
}
