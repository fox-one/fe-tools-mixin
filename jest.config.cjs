const config = require("@foxone/dev/config/jest.cjs");

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    "@foxone/mixin-api": "<rootDir>/packages/api/src/index.ts",
    "@foxone/mixin-api(.*)$": "<rootDir>/packages/api/src/$1"
  },
  modulePathIgnorePatterns: ["<rootDir>/packages/dev/build"],
  resolver: "@foxone/dev/config/jest-resolver.cjs"
});
