import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '@src/persistence/entities/user.orm.entity';
import { UserRepository } from '@src/persistence/repositories/user.repository';
import ormConfig from '@src/persistence/configs/orm-config';

const feature = TypeOrmModule.forFeature([UserOrmEntity]);

@Global()
@Module({
    imports: [TypeOrmModule.forRoot(ormConfig)],
    providers: [...feature.providers!, UserRepository],
    exports: [...feature.exports!, UserRepository],
})
export class PersistenceModule {}
