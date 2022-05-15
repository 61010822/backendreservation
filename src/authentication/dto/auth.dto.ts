import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AuthRequestDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code: string
}
