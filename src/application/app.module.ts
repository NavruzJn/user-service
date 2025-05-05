import { Module } from '@nestjs/common';
import { CreateUserCommand } from '@src/application/commands/create-user.command';
import { UpdateUserCommand } from '@src/application/commands/update-user.command';
import { DeleteUserCommand } from '@src/application/commands/delete-user.command';
import { GetUsersController } from '@src/application/controllers/get-users.controller';
import { CreateUserHandler } from '@src/application/handlers/create-user.handler';
import { UpdateUserHandler } from '@src/application/handlers/update-user.handler';
import { DeleteUserHandler } from '@src/application/handlers/delete-user.handler';
import { GetUsersHandler } from '@src/application/handlers/get-users.handler';
import { PersistenceModule } from '@src/persistence/persistence.module';
import { AuthModule } from '@src/application/auth/auth.module';
import { AuthCommand } from '@src/application/commands/auth.command';
import { AuthHandler } from '@src/application/handlers/auth.handler';

@Module({
    imports: [PersistenceModule, AuthModule],
    controllers: [AuthCommand, CreateUserCommand, UpdateUserCommand, DeleteUserCommand, GetUsersController],
    providers: [AuthHandler, CreateUserHandler, UpdateUserHandler, DeleteUserHandler, GetUsersHandler],
})
export class AppModule {}
