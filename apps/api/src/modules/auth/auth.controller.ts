import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { registerSchema, loginSchema } from '@bm/shared';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() body: unknown) {
    const data = registerSchema.parse(body);
    const result = await this.authService.register(data);
    return { success: true, data: result };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  async login(@Body() body: unknown) {
    const data = loginSchema.parse(body);
    const result = await this.authService.login(data.email, data.password);
    return { success: true, data: result };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  async refresh(@Body('refreshToken') refreshToken: string) {
    const tokens = await this.authService.refreshTokens(refreshToken);
    return { success: true, data: tokens };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async me(@CurrentUser() user: { id: string; email: string; role: string }) {
    const profile = await this.authService.getProfile(user.id);
    return { success: true, data: profile };
  }
}
