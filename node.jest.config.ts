import type {Config } from "jest";
// The test environment that will be used for testing
  import basisConfig from "./jest.config";
  const consfig: Config = {
    testEnvironment: "node", 
      // The glob patterns Jest uses to detect test files
    testMatch: [
        '<rootDir>/src/__tests__/testsOfHandlers/*.{js,jsx,ts,tsx}',
    ],
    ...basisConfig

  }

  export default consfig;