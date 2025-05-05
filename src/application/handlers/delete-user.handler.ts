import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@src/persistence/repositories/user.repository';
import { UserIdDto } from '@src/application/types/user-id.dto';

@Injectable()
export class DeleteUserHandler {
    constructor(private readonly userRepository: UserRepository) {}

    public async handle(dto: UserIdDto) {
        const result = await this.userRepository.delete(dto.id);

        if (!result?.affected) {
            throw new NotFoundException('User not found');
        }

        return {
            result: result.affected > 0,
        };
    }
}
