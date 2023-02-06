import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Global()
@Module({
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
