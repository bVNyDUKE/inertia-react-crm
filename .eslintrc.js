/* eslint-env node */
module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  globals: {
    route: true,
  },
  extends: ["plugin:react/recommended", "eslint:recommended", "prettier", "plugin:react/jsx-runtime"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: [],
  rules: {
    eqeqeq: "error",
    "no-console": 0,
    "react/prop-types": 0,
    semi: 2,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      alias: [["@", "./resources/js"]],
    },
  },
  ignorePatterns: ["tailwind.config.js", ".eslintrc.js", "webpack.config.js", "webpack.mix.js"],
};
