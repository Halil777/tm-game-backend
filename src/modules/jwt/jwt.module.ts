import { Module } from '@nestjs/common';
import AppJwtService from './jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: 'QwertyWeb123' })],
  providers: [AppJwtService],
  exports: [AppJwtService],
})
export class AppJwtModule {}
