// users.service.ts

import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class MembersService {
    constructor(
        @InjectRepository(Member)
        private membersRepository: Repository<Member>,
    ) { }

    async create(createUserDto: CreateMemberDto): Promise<any> {
        const isExist = await this.membersRepository.findOneBy({ userId: createUserDto.userId });
        if (isExist) {
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`이미 등록된 사용자입니다.`],
                error: 'Forbidden'
            })
        }
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const { password, ...result } = await this.membersRepository.save(createUserDto);
        return result;
    }


    async findAll(): Promise<Member[]> {
        return this.membersRepository.find({
            select: ["seq", "userId", "userName", "role"],
        });
    }

    findOne(id: string): Promise<Member> {
        return this.membersRepository.findOne({
            where: {
                userId: id
            },
            select: ["seq", "userId", "userName", "role"],
        });
    }

    async remove(id: string): Promise<void> {
        await this.membersRepository.delete(id);
    }

    async update(id: string, updateMemberDto: UpdateMemberDto): Promise<void> {
        const isExist = await this.membersRepository.findOneBy({ userId: id });
        if (!isExist) {
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`사용자 등록을 먼저 해주세요.`],
                error: 'Forbidden'
            })
        }
        if (updateMemberDto.password !== undefined) {
            updateMemberDto.password = await bcrypt.hash(updateMemberDto.password, 10);
        }
        await this.membersRepository.update(id, updateMemberDto);
    }
}