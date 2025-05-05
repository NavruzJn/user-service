import { ConnectionOptions } from 'typeorm';
import { UserOrmEntity } from '@src/persistence/entities/user.orm.entity';

const ormConfig: ConnectionOptions = {
    type: 'postgres',
    uuidExtension: 'pgcrypto',
    host: process.env.DB_HOST || 'db',
    database: process.env.DB_NAME || 'db',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    entities: [UserOrmEntity],
    // migrations,
    migrationsRun: true,
    synchronize: false,
    logging: false,
};
export default ormConfig;
