import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import SignUpDto from './dto/sign-up.dto';
import SignInDto from './dto/sign-in.dto';
import ClientGuard from '../user/client.guard';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import ResetPasswordDto from './dto/reset-password.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('elektron-sport.msi')
  downloadWindows(@Res() response: Response) {
    const file = readFileSync(join(process.cwd(), 'upload/app/windows.msi'));
    response.send(file);
  }

  @Get('elektron-sport.dmg')
  downloadMac(@Res() response: Response) {
    const file = readFileSync(join(process.cwd(), 'upload/app/mac.dmg'));
    response.send(file);
  }

  @Post('sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.clientService.signUp(body);
  }

  @Post('sign-in')
  signIn(@Body() body: SignInDto) {
    return this.clientService.signIn(body);
  }

  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.clientService.resetPassword(body.email);
  }

  @Post('pay-with-key/:key')
  @UseGuards(ClientGuard)
  payWithKey(@Param('key') key: string, @Req() req: Express.Request) {
    const client = req['client'];
    return this.clientService.payWithKey(key, +client['id']);
  }

  @Post('check-payment')
  @UseGuards(ClientGuard)
  checkPayment(@Req() req: Express.Request) {
    const client = req['client'];
    return this.clientService.checkPaymant(+client['id']);
  }
}
