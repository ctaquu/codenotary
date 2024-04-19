import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return '<h2>Codenotary Home Assignment API!</h2>See docs here: <a href="https://documenter.getpostman.com/view/33580185/2sA3BoYr72#4ca4c059-4041-4942-8820-a52424cfdbfe">DOCS</a>'
  }
}
