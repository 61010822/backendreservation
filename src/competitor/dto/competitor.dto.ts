import {
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import * as admin from 'firebase-admin'

import { firestore } from 'firebase-admin'
import DocumentReference = firestore.DocumentReference

export class CompetitorDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  prefix: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fname: string

  @ApiProperty()
  @IsNotEmpty()
  age: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lname: string

  @ApiProperty()
  @IsNotEmpty()
  nname: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  affiliation: string
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  district: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  line?: string | undefined

  @IsNumberString()
  @IsNotEmpty()
  @IsMobilePhone('th-TH')
  @ApiProperty()
  phone: string

  @IsOptional()
  @IsNumberString()
  @IsMobilePhone('th-TH')
  @ApiPropertyOptional()
  supervisor_phone?: string | undefined

  @IsInt()
  @ApiProperty()
  @IsNotEmpty()
  time_participated: number

  @IsNumberString()
  @ApiProperty()
  @IsNotEmpty()
  postal: string

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  province: string
  @ApiProperty()
  @IsNotEmpty()
  sub_district: string

  @IsString()
  @MaxLength(300)
  @IsOptional()
  @ApiPropertyOptional()
  testimonial?: string | undefined

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  examId: string

  @Expose()
  get exam(): DocumentReference {
    const db = admin.firestore()
    return db.collection('competitors').doc(this.examId)
  }

  @IsString({
    each: true
  })
  @IsUrl(
    {},
    {
      each: true
    }
  )
  @IsNotEmpty()
  @ApiProperty()
  payslips?: string[]
}

export class CompetitorsForSuperVisorsDTO extends CompetitorDto {
  @IsString({
    each: true
  })
  @IsOptional()
  @ApiPropertyOptional()
  payslips?: string[] | undefined
}
