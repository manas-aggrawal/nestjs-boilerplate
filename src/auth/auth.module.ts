import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '@src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { ForgotPasswordTokenStrategy } from './strategies/forgot-password-token.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Global()
@Module({
	imports: [UserModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		AccessTokenStrategy,
		RefreshTokenStrategy,
		ForgotPasswordTokenStrategy,
		JwtService,
	],
})
export class AuthModule {}
