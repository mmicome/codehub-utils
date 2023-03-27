module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0
  },
  "globals": {
    "process": true
  }
}
