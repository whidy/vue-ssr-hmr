module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "extends": [
    "airbnb-base",
    "plugin:vue/recommended"
  ],
  "globals": {
    "window": false,
  },
  "rules": {
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "space-before-function-paren": [
      "error",
      "never"
    ],
    "nuxt/no-cjs-in-config": "off",
    "no-console": "off",
    "no-unused-vars": "off",
    "quotes": [
      2, "single"
    ],
    "semi": [
      2, "never"
    ],
    "vue/html-closing-bracket-newline": [
      2,
      {
        "singleline": "never",
        "multiline": "never"
      }
    ],
    "vue/singleline-html-element-content-newline": "off",
    "vue/max-attributes-per-line": [
      2,
      {
        "singleline": 3,
        "multiline": {
          "max": 1,
          "allowFirstLine": false
        }
      }
    ]
  }
}
