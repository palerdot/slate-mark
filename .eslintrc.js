module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    // disable explicit function return type (let it be inferred by compiler)
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
}
