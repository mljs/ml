import cheminfo from 'eslint-config-cheminfo';
import globals from 'globals';

export default [
  ...cheminfo,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      //      "camelcase": "off",
    }
  }
]