import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/members/member.entity';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { MembersModule } from 'src/members/members.module';
import { PassportModule } from '@nestjs/passport';



@Module({
    imports: [
        MembersModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: "secret", // 환경변수로
                signOptions: {
                    expiresIn: '30m',
                },
            }),
        }),
        TypeOrmModule.forFeature([Member]),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }
