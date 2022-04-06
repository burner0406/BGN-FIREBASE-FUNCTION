module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "indent": "off",
    "semi": "off",
    "max-len": "off",
    "no-trailing-spaces": "off",
    "spaced-comment": "off",
    "linebreak-style": "off",
  },
  parserOptions: {
    ecmaVersion: 8,
  },
};
