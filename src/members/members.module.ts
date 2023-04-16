// members.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { Member } from './Member.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Member])],
    exports: [MembersService],
    providers: [MembersService],
    controllers: [MembersController],
})
export class MembersModule { }