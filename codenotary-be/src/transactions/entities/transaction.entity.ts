import { Entity, ObjectId } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

@Entity()
export class Transaction {
  @Exclude()
  _id: ObjectId
  @Exclude()
  _vault_md: { ts: number; creator: string }
  account_name: string
  account_number: number
  IBAN: string
  address: string
  amount: number
  type: 'sending' | 'receiving'

  @Expose()
  get id(): ObjectId {
    return this._id
  }

  @Expose()
  get time_created(): number {
    return this._vault_md?.ts
  }

  constructor(data: Partial<Transaction>) {
    this._id = data._id
    this._vault_md = data._vault_md
    this.account_name = data.account_name
    this.account_number = data.account_number
    this.IBAN = data.IBAN
    this.address = data.address
    this.amount = data.amount
    this.type = data.type
  }
}
