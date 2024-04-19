import { Injectable, ServiceUnavailableException } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { Transaction } from './entities/transaction.entity'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TransactionsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<boolean> {
    try {
      await firstValueFrom(
        this.httpService.put('/document', createTransactionDto, {
          headers: {
            'X-API-Key': this.configService.get('IMMUDB_VAULT_PRIVATE_KEY'),
          },
        }),
      )
      return Promise.resolve(true)
    } catch (e) {
      console.error('E001', e)
      throw new ServiceUnavailableException(`Service error: ${e}`)
    }
  }

  async findAll(): Promise<Transaction[]> {
    // fetch from external service/data source
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          '/documents/search',
          {
            page: 1,
            perPage: 100,
          },
          {
            headers: {
              'X-API-Key': this.configService.get('IMMUDB_VAULT_PUBLIC_KEY'),
            },
          },
        ),
      )
      // return parsed data into Transaction objects
      return (
        data.revisions
          // filter out the revisions that are not transactions (created during development)
          .filter(
            (revision: { document: CreateTransactionDto }) =>
              revision.document.account_number,
          )
          // map the revisions to Transaction objects
          .map((revision: { document: CreateTransactionDto }) => {
            return new Transaction(revision.document)
          })
      )
    } catch (e) {
      console.error('E002', e)
      throw new ServiceUnavailableException(`Service error: ${e}`)
    }
  }
}
