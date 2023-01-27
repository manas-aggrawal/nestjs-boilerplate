import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DocsModule } from './docs/docs.module';

@Module({
	imports: [AuthModule, DocsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
