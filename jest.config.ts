import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testMatch: ['<rootDir>/app/**/__tests__/**/*.{ts,tsx,js,jsx}'],
  collectCoverageFrom: ['app/**'],
  modulePathIgnorePatterns: [
    '/app/root.tsx',
    '/app/ThemeContext.tsx',
    '/services/api.ts',
    '/layouts/main.tsx',
    '/store/reduxProvider.tsx',
    '/store/store.ts',
    '/routes/index.tsx',
    '/routes/search.tsx',
  ],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

export default config;
