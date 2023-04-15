// user.entity.ts

import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}