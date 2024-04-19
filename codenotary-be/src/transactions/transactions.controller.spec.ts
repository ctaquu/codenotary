import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { Transaction } from './entities/transaction.entity'
import { TRANSACTION_TYPE } from './dto/create-transaction.dto'

describe('TransactionsController', () => {
  let controller: TransactionsController
  let transactionsService: TransactionsService
  let httpService: HttpService
  let configService: ConfigService

  beforeEach(async () => {
    transactionsService = new TransactionsService(httpService, configService)
    controller = new TransactionsController(transactionsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should return an array of Transactions', async () => {
      jest
        .spyOn(transactionsService, 'create')
        .mockImplementation(() => Promise.resolve(true))

      expect(
        await controller.create({
          account_number: 3243242,
          account_name: 'John Doe',
          IBAN: 'DE89370400440532013000',
          address: 'Berlin',
          amount: 100,
          type: TRANSACTION_TYPE.RECEIVING,
        }),
      ).toBeTruthy()
    })
  })

  describe('findAll', () => {
    it('should return an array of Transactions', async () => {
      const result = [
        new Transaction({
          account_number: 3243242,
          account_name: 'John Doe',
          IBAN: 'DE89370400440532013000',
          address: 'Berlin',
          amount: 100,
          type: 'sending',
        }),
      ]
      jest
        .spyOn(transactionsService, 'findAll')
        .mockImplementation(() => Promise.resolve(result))

      expect(await controller.findAll()).toEqual(result)
    })
  })
})
