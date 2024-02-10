import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Logger,
} from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { Public } from '../auth/consts';

type UserNameArg = {
  userName: string;
};

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Public()
  @Post()
  create(@Body() user: User) {
    return this.service.create(user);
  }

  @Public()
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Public()
  @Get('name')
  findByName(@Body() userNameArg: UserNameArg) {
    console.log(userNameArg);
    Logger.log(userNameArg);
    return this.service.findOneByName(userNameArg.userName);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() User: User) {
    return this.service.update(+id, User);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
