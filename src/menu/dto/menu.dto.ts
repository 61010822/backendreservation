import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class MenuID {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  id: String
}

export class MenuPayload {
  @IsString()
  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  thumbnail?: String

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: String

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  description: String

  @IsNumber()
  @Min(0)
  @ApiProperty()
  @IsNotEmpty()
  price: Number
}
