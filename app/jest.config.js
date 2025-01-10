module.exports = {
    preset: 'next/babel',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
     '\\.css$': 'jest-transform-stub', // Mock CSS files
    },
    transform: {
      '^.+\\.tsx?$': 'babel-jest', // Transform TypeScript files
    },
    transformIgnorePatterns: [
      '/node_modules/(?!next|react-icons)/', // Ensure specific libraries are transformed
    ],
  };
  