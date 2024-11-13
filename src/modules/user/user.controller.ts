import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import SignInDto from './dto/sign-in.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  signIn(@Body() body: SignInDto) {
    return this.userService.signIn(body);
  }
}
