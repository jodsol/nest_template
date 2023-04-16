import { Controller, UseGuards, Post, Body, Get, Put, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { CreateMemberDto } from './dto/create-member.dto';
import { MembersService } from './members.service';
import { Member } from './member.entity';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
@UseGuards(RolesGuard)
export class MembersController {
    constructor(private readonly memberService: MembersService) { }
    //users.controller.ts
    @ApiResponse({
        status: 500,
        description: 'Server Error...',
    })
    @ApiResponse({
        status: 201,
        description: 'User created!',
    })
    @ApiOperation({ summary: '회원가입' })
    @Post()
    create(@Body() createUserDto: CreateMemberDto): Promise<any> {
        return this.memberService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<Member[]> {
        return this.memberService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Member> {
        return this.memberService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto): Promise<any> {
        return this.memberService.update(id, updateMemberDto);
    }
}
