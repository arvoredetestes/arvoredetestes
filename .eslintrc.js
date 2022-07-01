module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    // Prettier
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["import", "unused-imports", "simple-import-sort", "react-hooks"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-var-requires": 0,
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "unused-imports/no-unused-imports-ts": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  },
};
