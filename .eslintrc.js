module.exports = {
  "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/vue3-essential",
      "eslint:recommended",
      "@vue/typescript",
      "@vue/typescript/recommended",
      "@vue/prettier",
      "@vue/prettier/@typescript-eslint"
    ],
    "parserOptions": {
      "parser": "@typescript-eslint/parser",
      "ecmaVersion": 2020
    },
    "rules": {
      'no-console': "off",
      'no-debugger': "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/camelcase": "off"
    },
    "globals": {
      "tinyMCE": true
    }
}