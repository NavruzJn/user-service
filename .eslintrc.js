/**
 * eslint config
 * https://github.com/Sairyss/backend-best-practices#static-code-analysis
 */

module.exports = {
  parser: '@typescript-eslint/parser',
  settings: {
    "import/resolver": {
      typescript: {}
    }
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: "./",
  },
  plugins: [
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint',
      'prettier',
      'jest',
      'import'
  ],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/typescript',
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest/all",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // TS off
    'no-empty-function': [
      'error',
      {
        allow: ['constructors'], // Allow empty constructors
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    /*"@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": false
        }
      }
    ],*/

    // TS errors
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    "newline-before-return": "error",
    "jest/no-hooks": "off",
    "jest/require-hook": "off",
    "jest/prefer-expect-assertions": 0,
    "jest/no-truthy-falsy": 0,
    "jest/no-restricted-matchers": [
      "error",
      {
        "toBeTruthy": "Avoid `toBeTruthy`",
        "toBeFalsy": "Avoid `toBeFalsy`"
      }
    ],
    "prettier/prettier": "error",
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "import/no-cycle": 0,
    "no-useless-constructor": 0,
    "class-methods-use-this": 0,
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        "accessibility": "explicit",
        "overrides": {
          "constructors": "no-public"
        }
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowExpressions": true,
        "allowTypedFunctionExpressions": true
      }
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "default",
        "leadingUnderscore": 'allow',
        "format": ["camelCase", "PascalCase"]
      },
      {
        "selector": "memberLike",
        "leadingUnderscore": 'allow',
        "format": ["camelCase", "UPPER_CASE", "snake_case"]
      },
      {
        "selector": "enumMember",
        "format": ["PascalCase", "UPPER_CASE", "camelCase"]
      },
      {
        "selector": "property",
        "leadingUnderscore": 'allow',
        "format": ["camelCase", "UPPER_CASE", "snake_case"]
      },
      {
        "selector": "variable",
        "leadingUnderscore": 'allow',
        "format": ["camelCase", "UPPER_CASE"]
      },
      {
        "selector": "variable",
        "filter": {
          "regex": "^Use|Enum$",
          "match": true
        },
        "leadingUnderscore": 'allow',
        "format": ["camelCase", "PascalCase", "UPPER_CASE"]
      },
      {
        "selector": "typeLike",
        "leadingUnderscore": 'allow',
        "format": ["PascalCase"]
      },
      {
        "selector": "function",
        "leadingUnderscore": 'allow',
        "filter": {
          "regex": "^Is|^Use|Dto$|Factory$",
          "match": true
        },
        "format": ["camelCase", "PascalCase"]
      }
    ],

    // Eslint off
/*    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'import/no-unresolved': 'off',
    'no-control-regex': 'off',
    'no-shadow': 'off',
    'import/no-cycle': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'max-classes-per-file': 'off',*/

    // Eslint errors
    'no-restricted-syntax': [
      'error',
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
      {
        selector: "MethodDefinition[kind='set']",
        message: 'Property setters are not allowed',
      },
    ],
  },
  "overrides": [
    {
      "files": ["*.spec.ts"],
      "rules": {
        "@typescript-eslint/unbound-method": "off"
      }
    }
  ]
};
