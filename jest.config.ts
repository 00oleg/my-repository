import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{ts,tsx,js,jsx}'],
  collectCoverageFrom: ['src/**'],
  modulePathIgnorePatterns: [
    'App.tsx',
    'getArryByNumber',
    'ThemeContext.tsx',
    'main.tsx',
    'src/components/ErrorBoundary/index.tsx',
    'src/hooks/useSearchQuery.tsx',
    'src/pages/Search/index.tsx',
    'src/components/ThemeSelector/index.tsx',
    'src/components/Search/index.tsx',
    'src/components/ResultActions/index.tsx',
  ],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

export default config;
