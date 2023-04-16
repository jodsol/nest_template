import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/members/member.entity';
import { Repository } from 'typeorm';
import { LoginMemberDto } from 'src/members/dto/login-member.dto';
// auth.service.ts

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Member)
        private memberRepository: Repository<Member>,
        private jwtService: JwtService
    ) { }



    async validateMember(loginMemberDto: LoginMemberDto): Promise<any> {
        const member = await this.memberRepository.findOneBy({ userId: loginMemberDto.userId });

        if (!member) {
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`등록되지 않은 사용자입니다.`],
                error: 'Forbidden'
            })
        }

        const isMatch = await bcrypt.compare(loginMemberDto.password, member.password);

        if (isMatch) {
            const { password, ...result } = member;
            return result;
        } else {
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`사용자 정보가 일치하지 않습니다.`],
                error: 'Forbidden'
            })
        }
    }

    async login(member: any) {
        const payload = { userId: member.userId, memberName: member.memberName, seq: member.seq, role: member.role };
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}