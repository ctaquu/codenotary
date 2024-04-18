import { IsEnum, IsIBAN, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export enum TYPE {
  SENDING = 'sending',
  RECEIVING = 'receiving',
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  account_number: number

  @IsNotEmpty()
  @IsString()
  account_name: string

  @IsNotEmpty()
  @IsIBAN()
  IBAN: string

  @IsNotEmpty()
  @IsString()
  address: string

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsNotEmpty()
  @IsEnum(TYPE)
  type: TYPE
}
