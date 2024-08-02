import jsdoc from "eslint-plugin-jsdoc";
import parser from "@typescript-eslint/parser";

export default [
  {
    files: ['**/*.ts'],
    plugins: {
      jsdoc
    },
    rules: {
      'jsdoc/require-description': 'error',
      'jsdoc/check-values': 'error'
    }
  },
  {
    // ...other config
    languageOptions: {
      parser
    }
    // ...other config
  }
];


module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.mjs', '.ts', '.mts']
      }
    }
  },
  globals: {
    'describe': 'readonly',
    'it': 'readonly',
    'afterEach': 'readonly',
    'before': 'readonly'
  },
  rules: {
    'import/no-cycle': 'error',
    'default-case': 0,
    'no-await-in-loop': 'warn',
    'class-methods-use-this': 'off',
    'no-plusplus': 0,
    'no-return-assign': 0,
    'arrow-body-style': 0,
    'no-continue': 0,
    'radix': ['error', 'as-needed'],
    'comma-dangle': 0,
    'no-console': 'error',
    'max-lines-per-function': [1, {'max': 25, 'skipBlankLines': true}],
    'complexity': ['error', 10],
    'consistent-return': 0,
    'no-param-reassign': 0,
    'linebreak-style': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'arrow-parens': 0,
    'max-lines': ['warn', {'max': 315, 'skipBlankLines': true}],
    'max-len': [
      1,
      {
        'code': 100,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true
      }
    ],
    'max-depth': ['error', 3],
    'quotes': ['error', 'single', {'allowTemplateLiterals': true}],
    'function-paren-newline': 'warn',
    'function-call-argument-newline': 'warn',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    '@typescript-eslint/comma-dangle': 'error',
    '@typescript-eslint/lines-between-class-members': 0,
    'import/no-extraneous-dependencies': 1,
    'import/prefer-default-export': 1,
    '@typescript-eslint/no-extra-semi': 1,
    'camelcase': 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        'selector': 'default',
        'format': ['camelCase']
      },

      {
        'selector': 'variable',
        'format': ['camelCase', 'UPPER_CASE'],
        'leadingUnderscore': 'allow'
      },
      {
        'selector': 'parameter',
        'format': ['camelCase', 'snake_case'],
        'leadingUnderscore': 'allow'
      },

      {
        'selector': 'memberLike',
        'modifiers': ['private'],
        'format': ['camelCase'],
        'leadingUnderscore': 'require'
      },
      {
        'selector': 'typeLike',
        'format': ['PascalCase']
      },
      {
        'selector': 'classMethod',
        'format': ['camelCase'],
        'leadingUnderscore': 'allow'
      }
    ],
    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['warn', 'always'],
    '@typescript-eslint/no-useless-constructor': ['warn'],
    '@typescript-eslint/quotes': ['error', 'single', {'allowTemplateLiterals': true}],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/consistent-type-imports': 'error',
    'newline-before-return': 'error',
    'no-restricted-syntax': [
      'error',
      'FunctionDeclaration[params.length>3]'
    ],
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'semi',
        'requireLast': true
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': true
      }
    }],
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/array-type': ['error', {'default': 'array'}]
  },
  ignorePatterns: [
    'dist/*',
    'scripts/*',
    'coverage/*',
    '.docker/*',
    '.eslintrc.js'
  ]
};
