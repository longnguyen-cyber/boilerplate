import { SUCCESS_MESSAGE } from '@common/constants';
import { ResponseMessage } from '@common/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from './dtos/register-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ResponseMessage(SUCCESS_MESSAGE.LOGIN)
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto): Promise<string> {
    return await this.authService.signIn(body);
  }

  @Post('/register')
  @ResponseMessage(SUCCESS_MESSAGE.REGISTER)
  @ApiBody({ type: CreateUserDto })
  async register(@Body() body: CreateUserDto): Promise<string> {
    return await this.authService.registerUser(body);
  }
}
