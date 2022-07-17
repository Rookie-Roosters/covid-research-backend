import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '@users/controllers';
import { Role, User } from './entities';
import { UsersService } from './services';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
