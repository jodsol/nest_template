import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { LoginMemberDto } from "../members/dto/login-member.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'userId'
        });
    }

    async validate(userId: string, password: string): Promise<any> {
        let LoginMemberDto: LoginMemberDto = {
            userId: userId,
            password: password,
        }

        const user = await this.authService.validateMember(LoginMemberDto);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}