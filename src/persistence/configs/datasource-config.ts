import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserOrmEntity } from '@src/persistence/entities/user.orm.entity';
import { get } from 'env-var';
export const datasourceConfig = new DataSource({
    type: 'postgres',
    host: get('DB_HOST').required().asString(),
    port: get('DB_PORT').required().asPortNumber(),
    username: get('DB_USERNAME').required().asString(),
    password: get('DB_PASSWORD').required().asString(),
    database: get('DB_NAME').required().asString(),
    entities: [UserOrmEntity],
    migrations: ['@src/persistence/migrations/*'],
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
});
