import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { Transaction } from './entities/transaction.entity'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(): Promise<Transaction[]> {
    return this.transactionsService.findAll()
  }
}
