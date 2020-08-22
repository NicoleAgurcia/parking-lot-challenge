import { Module, HttpModule } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [HttpModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
