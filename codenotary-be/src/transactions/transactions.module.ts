import { Module } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { TransactionsController } from './transactions.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('API_BASE_URL'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
        timeout: configService.get('HTTP_TIMEOUT'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, ConfigService],
})
export class TransactionsModule {}
