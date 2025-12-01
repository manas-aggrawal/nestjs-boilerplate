import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '@src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
	controllers: [UserController],
	providers: [UserService, Logger, AuthService, JwtService],
	exports: [UserService],
})
export class UserModule {}
