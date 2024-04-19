import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toEqual(
        `<h2>Codenotary Home Assignment API!</h2>See docs here: <a href=\"https://documenter.getpostman.com/view/33580185/2sA3BoYr72#4ca4c059-4041-4942-8820-a52424cfdbfe\">DOCS</a>`,
      )
    })
  })
})
