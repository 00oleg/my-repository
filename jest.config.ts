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
        presets: ['next/babel'],
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{ts,tsx,js,jsx}'],
  collectCoverageFrom: ['src/**'],
  modulePathIgnorePatterns: [
    'app/layout.tsx',
    'ThemeContext.tsx',
    '/app/search/page.tsx',
    '/services/api.ts',
    '/layouts/main.tsx',
    '/store/reduxProvider.tsx',
    '/store/store.ts',
  ],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

export default config;
