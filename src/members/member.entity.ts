// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    seq: number;

    @Column()
    userName: string;

    @PrimaryColumn()
    userId: string;

    @Column()
    password: string;

    @Column()
    role: string;
}