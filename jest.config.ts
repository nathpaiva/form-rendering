import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  collectCoverageFrom: [
    'src/**',
    '!src/**/index.ts',
    '!src/**/types/**',
    '!src/vite-env.d.ts',
  ],
}

export default config
