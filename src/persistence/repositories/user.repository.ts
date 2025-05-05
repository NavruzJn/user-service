import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrmEntity } from '@src/persistence/entities/user.orm.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserInterface } from '@src/domain/interfaces/user.interface';
import { SortOrderEnum } from '@src/application/constants/enums';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(UserOrmEntity) private readonly userRepository: Repository<UserOrmEntity>) {}

    public save(user: UserInterface): Promise<UserOrmEntity> {
        return this.userRepository.save(user);
    }

    public delete(id: string): Promise<DeleteResult> {
        return this.userRepository.delete({ id });
    }

    public findById(id: string): Promise<UserOrmEntity | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    public findBy(query: FindOneOptions<UserOrmEntity>): Promise<UserOrmEntity | null> {
        return this.userRepository.findOne(query);
    }

    public async find(query: {
        page: number;
        pageSize: number;
        sortBy?: string;
        sortOrder?: SortOrderEnum;
    }): Promise<{ users: UserOrmEntity[]; count: number }> {
        const { page, pageSize, sortBy, sortOrder } = query;
        const options: FindManyOptions<UserOrmEntity> = {
            skip: (page - 1) * pageSize,
            take: pageSize,
        };

        if (sortBy && sortOrder) {
            options.order = {
                [sortBy]: sortOrder,
            };
        }

        const [users, count] = await this.userRepository.findAndCount(options);

        return { users, count };
    }
}
