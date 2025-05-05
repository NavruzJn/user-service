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
        try {
            return this.userRepository.save(newUser);
        } catch (error) {
            // 23505 typeorm conflict constraint error
            if ((error as any).code === '23505') {
                throw new ConflictException('Email already exists');
            }
            throw error;
        }
    }
}
