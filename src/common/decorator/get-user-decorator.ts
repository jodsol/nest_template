//get-user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Member } from 'src/members/member.entity';

export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext): Member => {
        const req = ctx.switchToHttp().getRequest();
        return req.user;
    },
);