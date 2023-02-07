import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Global()
@Module({
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		AccessTokenStrategy,
		RefreshTokenStrategy,
		JwtService,
	],
})
export class AuthModule {}
