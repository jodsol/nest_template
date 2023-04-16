import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorator/get-user-decorator';
import { LocalAuthGuard } from 'src/common/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

// auth.controller.ts

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    // auth.controller.ts
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async authTest(@GetUser() req) {
        return req.user;
    }
}