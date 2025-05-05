import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@src/persistence/repositories/user.repository';
import { CreateUserDto } from '@src/application/types/create-user.dto';
import { UserIdDto } from '@src/application/types/user-id.dto';
import { GetUsersDto } from '@src/application/types/get-users.dto';
import { GetUserResponse } from '@src/application/types/get-user.response';
import { GetUsersResponse } from '@src/application/types/get-users.response';

@Injectable()
export class GetUsersHandler {
    constructor(private readonly userRepository: UserRepository) {}

    public async getUsers(dto: GetUsersDto): Promise<GetUsersResponse> {
        const { users, count } = await this.userRepository.find(dto);

        return {
            users,
            hasNextPage: count > dto.page * dto.pageSize,
        };
    }

    public async getUser(dto: UserIdDto): Promise<GetUserResponse> {
        const user = await this.userRepository.findById(dto.id);

        if (!user) {
            throw new NotFoundException();
        }

        return { user };
    }
}
