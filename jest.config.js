module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        './node_modules/',
        '.module.ts',
        './src/persistence/migrations/',
        '.orm.entity.ts',
    ],
    errorOnDeprecated: true,
    moduleFileExtensions: ['js', 'ts'],
    resetMocks: false,
    testLocationInResults: true,
    testTimeout: 100000,
    reporters: ['default', 'jest-junit'],
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    testPathIgnorePatterns: ['./node_modules/'],
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
    },
    coverageThreshold: {
        global: {
            branches: 40,
            functions: 40,
            lines: 40,
        },
    },
};
