import { Module } from "@nestjs/common";
import { MembersModule } from "./members.module";
import { MembersService } from "./members.service";
import { MembersController } from "./members.controller";

@Module({
    imports: [MembersModule],
    providers: [MembersService],
    controllers: [MembersController]
})
export class MembersHttpModule { }