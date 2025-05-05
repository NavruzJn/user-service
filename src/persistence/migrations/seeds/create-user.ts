import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { PersistenceModule } from '@src/persistence/persistence.module';
import { UserRepository } from '@src/persistence/repositories/user.repository';
import { UserOrmEntity } from '@src/persistence/entities/user.orm.entity';
import { v4 as uuidV4 } from 'uuid';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(PersistenceModule);

    const dataSource = app.get(DataSource);
    const userService = app.get(UserRepository);

    // Clear users
    await dataSource.getRepository(UserOrmEntity).clear();

    // Seed new users
    const newUser = new UserOrmEntity({
        id: uuidV4(),
        email: 'admin@gmail.com',
        password: 'password', // Hashing should be done inside service
    });

    await userService.save(newUser);

    console.log('Seeding complete.');
    await app.close();
}

bootstrap();
