import { SUCCESS_MESSAGE } from '@common/constants';
import { GetUser } from '@common/decorators';
import { ResponseMessage } from '@common/decorators/response-message.decorator';
import { TUserEntity } from '@common/types/account';
import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { JwtGuard } from '@core/authentication/guards';

@Controller('user')
@UseGuards(JwtGuard)
@ApiTags('User')
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ResponseMessage(SUCCESS_MESSAGE.USER_UPDATE_SUCCESS)
  @Patch()
  async updateUser(@Body(new ValidationPipe()) updateUserInput: UpdateUserDto) {
    try {
      const { name, email, phone } = updateUserInput;

      const user = await this.userService.update({
        where: {
          email,
        },
        data: {
          name,
          phone,
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          avatar: true,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Get('me')
  @ResponseMessage(SUCCESS_MESSAGE.USER_DETAIL_SUCCESS)
  async getMe(@GetUser() user: TUserEntity) {
    return user;
  }
}
