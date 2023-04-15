import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Member } from './members/member.entity';
import { MembersService } from './members/members.service';
import { MembersHttpModule } from './members-http/members-http.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'ilikebanana!23',
    database: 'test',
    entities: [Member],
    synchronize: true,
  }), MembersHttpModule,],
  controllers: [AppController],
  providers: [AppService, MembersService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
