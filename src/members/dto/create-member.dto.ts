import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMemberDto {
    @ApiProperty({
        example: 'hello@kakao.com',
        description: 'email',
        required: true,
    })
    @IsString()
    userId: string;

    @IsString()
    userName: string;

    @IsString()
    password: string;

    @IsString()
    role: string;
}