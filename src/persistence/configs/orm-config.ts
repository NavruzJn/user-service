import { ConnectionOptions } from 'typeorm';
import { UserOrmEntity } from '@src/persistence/entities/user.orm.entity';
import { get } from 'env-var';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const ormConfig: ConnectionOptions = {
    type: 'postgres',
    uuidExtension: 'pgcrypto',
    host: get('DB_HOST').required().asString(),
    port: get('DB_PORT').required().asPortNumber(),
    username: get('DB_USERNAME').required().asString(),
    password: get('DB_PASSWORD').required().asString(),
    database: get('DB_NAME').required().asString(),
    entities: [UserOrmEntity],
    // migrations,
    migrationsRun: true,
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
};
export default ormConfig;
