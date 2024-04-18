import { Injectable } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom } from 'rxjs'
import { Transaction } from './entities/transaction.entity'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TransactionsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<boolean> {
    this.httpService
      .put('/document', createTransactionDto, {
        headers: {
          'X-API-Key': this.configService.get('IMMUDB_VAULT_PRIVATE_KEY'),
        },
      })
      .pipe(
        // pipe operator to handle errors
        catchError((e) => {
          return Promise.reject(e.toString())
        }),
      )
    return Promise.resolve(true)
  }

  async findAll(): Promise<Transaction[]> {
    // fetch from external service/data source
    const { data } = await firstValueFrom(
      this.httpService
        .post(
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
        )
        .pipe(
          // pipe operator to handle errors
          catchError((e) => {
            return Promise.reject(e.toString())
          }),
        ),
    )
    // return parsed data into Transaction objects
    return (
      data.revisions
        // filter out the revisions that are not transactions
        .filter(
          (revision: { document: CreateTransactionDto }) =>
            revision.document.account_number,
        )
        // map the revisions to Transaction objects
        .map((revision: { document: CreateTransactionDto }) => {
          return new Transaction(revision.document)
        })
    )
  }
}
