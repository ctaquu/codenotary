import { Test, TestingModule } from '@nestjs/testing'
import { TransactionsService } from './transactions.service'
import { HttpModule, HttpService } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import { TRANSACTION_TYPE } from './dto/create-transaction.dto'
import { of } from 'rxjs'
import { AxiosResponse } from 'axios'

describe('TransactionsService', () => {
  let service: TransactionsService
  let httpService: HttpService

  const mockResponse: AxiosResponse<any> = {
    data: undefined,
    status: 0,
    statusText: '',
    headers: undefined,
    config: undefined,
  }
  let mockPut: jest.Mock
  let mockPost: jest.Mock

  beforeEach(async () => {
    mockPut = jest.fn(() => of(mockResponse))
    mockPost = jest.fn(() => of(mockResponse))

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [
        TransactionsService,
        {
          provide: HttpService,
          useValue: {
            put: mockPut,
            post: mockPost,
          },
        },
      ],
    }).compile()

    service = module.get<TransactionsService>(TransactionsService)
    httpService = module.get<HttpService>(HttpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should return true for valid payload', async () => {
      // valid payload
      const payload = {
        account_number: 3243242,
        account_name: 'John Doe',
        IBAN: 'DE89370400440532013000',
        address: 'Berlin',
        amount: 100,
        type: TRANSACTION_TYPE.RECEIVING,
      }
      const data = service.create(payload)
      await expect(data).resolves.toBeTruthy()
    })
  })

  describe('findAll', () => {
    it('should return a list of Transactions objects', async () => {
      mockResponse.data = {
        revisions: [
          {
            document: {
              _id: '123',
              _vault_md: {
                ts: 123352,
                creator: 'somerandomid',
              },
              account_number: 3243242,
              account_name: 'John Doe',
              IBAN: 'DE89370400440532013000',
              address: 'Berlin',
              amount: 100,
              type: TRANSACTION_TYPE.RECEIVING,
            },
          },
        ],
      }
      jest
        .spyOn(httpService, 'post')
        .mockImplementationOnce(() => of(mockResponse))

      const data = service.findAll()
      await expect(data).resolves.toEqual([
        {
          IBAN: 'DE89370400440532013000',
          _id: '123',
          _vault_md: {
            ts: 123352,
            creator: 'somerandomid',
          },
          account_name: 'John Doe',
          account_number: 3243242,
          address: 'Berlin',
          amount: 100,
          type: 'receiving',
        },
      ])
    })
  })
})
