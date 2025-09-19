/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import basisConfig from "./jest.config";
const config: Config = {
    // The test environment that will be used for testing
    testEnvironment: "jsdom", 
    // The glob patterns Jest uses to detect test files
    testMatch: [
        '<rootDir>/src/__tests__/testHandlerForm/*.{js,jsx,ts,tsx}',
    ],

    ...basisConfig
};

export default config;
