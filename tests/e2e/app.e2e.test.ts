import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppModule } from '@src/application/app.module';
import { OverrideByFactoryOptions } from '@nestjs/testing/interfaces/override-by-factory-options.interface';

const mockDataSource = () => ({
    getRepository: jest.fn(),
    createQueryRunner: jest.fn().mockReturnValue({
        connect: jest.fn(),
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        release: jest.fn(),
        manager: { save: jest.fn(), find: jest.fn(), findOne: jest.fn(), delete: jest.fn() },
    }),
});

const mockUserRepository = () => ({
    find: jest.fn(),
    findById: jest.fn(),
    findBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
});

const mockUserRepositoryFactory: OverrideByFactoryOptions = {
    factory: () => mockUserRepository,
};

const mockDataSourceFactory: OverrideByFactoryOptions = {
    factory: mockDataSource,
};

describe('Users E2E Tests', () => {
    let app: INestApplication;
    let userRepository: ReturnType<typeof mockUserRepository>;
    let dataSource: ReturnType<typeof mockDataSource>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(DataSource)
            .useFactory(mockDataSourceFactory)
            .overrideProvider('UserRepositoryRepository') // Assuming 'User' is the repository token
            .useFactory(mockUserRepositoryFactory)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        userRepository = moduleFixture.get('User');
        dataSource = moduleFixture.get(DataSource);
    });

    afterAll(async () => {
        await app.close();
    });
});
