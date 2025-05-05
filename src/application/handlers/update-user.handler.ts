import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@src/persistence/repositories/user.repository';
import { UserIdDto } from '@src/application/types/user-id.dto';
import { UpdateUserDto } from '@src/application/types/update-user.dto';
import { UserOrmEntity } from '@src/persistence/entities/user.orm.entity';

@Injectable()
export class UpdateUserHandler {
    constructor(private readonly userRepository: UserRepository) {}

    public async handle(body: UpdateUserDto, params: UserIdDto): Promise<UserOrmEntity> {
        const { id } = params;

        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const {
            email = user.email,
            firstname = user.firstname,
            password = user.firstname,
            lastname = user.lastname,
            birthdate = user.birthdate,
        } = body;

        try {
            return this.userRepository.save({
                id,
                email,
                firstname,
                password,
                lastname,
                birthdate,
            });
        } catch (error) {
            // 23505 typeorm conflict constraint error
            if ((error as any).code === '23505') {
                throw new ConflictException('Email already exists');
            }
            throw error;
        }
    }
}
