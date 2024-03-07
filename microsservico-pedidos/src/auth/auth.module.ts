import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "fdh3489fh3434kfnj439f4",
      signOptions: {expiresIn: "10h"}
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard]
})
export class AuthModule {}
