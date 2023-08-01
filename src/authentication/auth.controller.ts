import {
  Body,
  Controller,
  HttpCode,
  Post,
  Query,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { TLoginResponse } from './interfaces/auth.interface';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Req() request: Request,
    @Query('grant_type') grant_type: string,
  ): Promise<TLoginResponse> {
    return await this.authService.login(request, grant_type);
  }

  @Post('register')
  async register(
    @Req() request: Request,
    @Query('grant_type') grant_type: string,
  ) {
    return await this.authService.register(request, grant_type);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(@Body('refresh_token') refresh_token: string) {
    return await this.authService.refreshToken(refresh_token);
  }
}
