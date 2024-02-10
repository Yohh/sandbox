import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './consts';
import { UsersService } from 'src/users/users.service';

type SignInArg = {
  userName: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('login')
  async signIn(@Body() signInArg: SignInArg) {
    const users = await this.usersService.findAll();
    const user = users.find((user) => user.userName === signInArg.userName);
    const result = await this.authService.validateUser(
      user,
      signInArg.password,
    );
    return this.authService.signIn(result);
  }
}
