import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
	controllers: [UserController],
	providers: [UserService, Logger],
	exports: [UserService],
})
export class UserModule {}
