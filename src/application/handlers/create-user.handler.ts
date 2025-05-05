import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '@src/persistence/repositories/user.repository';
import { CreateUserDto } from '@src/application/types/create-user.dto';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class CreateUserHandler {
    constructor(private readonly userRepository: UserRepository) {}

    public handle(dto: CreateUserDto) {
        const newUser = {
            id: uuidV4(),
            ...dto,
        };

        return this.userRepository.save(newUser);
    }
}
