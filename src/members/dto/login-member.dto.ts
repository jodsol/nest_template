import { IsString } from "class-validator";

export class LoginMemberDto {
    @IsString()
    userId: string;

    @IsString()
    password: string;

}
