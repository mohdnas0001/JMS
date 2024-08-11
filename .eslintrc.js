const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
  ],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    "no-console": "off",
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-shadow': [
      'error',
      {
        ignoreOnInitialization: true,
      },
    ],
    'import/newline-after-import': 'error',
    'react/jsx-uses-react': 'error',
    'react/react-in-jsx-scope': 'off', // React 17+ no longer requires React to be in scope
    'unicorn/filename-case': [
      'error',
      {
        cases: {{
          "extends": [
            "next/core-web-vitals",
            //"plugin:@typescript-eslint/recommended-type-checked",
            "prettier"
          ],
          "plugins": ["@typescript-eslint", "simple-import-sort", "unused-imports", "@tanstack/query"],
          "ignorePatterns": ["static_forms/**"],
          /** Enable type-checking later when it is safe to */
          /**
          "parser": "@typescript-eslint/parser",
          "parserOptions": {
            "project": true,
            "tsconfigRootDir": "."
          },
          */
          "root": true,
           "overrides": [
          {
            "files": ["*.ts", "*.tsx"],
            "rules": {
              "@typescript-eslint/no-shadow": ["error"],
              "no-shadow": "off",
              "no-undef": "off"
            }
          },
          {
            "files": ["*.test.ts", "*.test.tsx"],
            "plugins": ["jest"],
            "extends": ["plugin:jest/recommended", "plugin:jest/style"],
            "env": {"jest/globals": true}
          }
        ],
        "rules": {
          //"max-len": ["error", {"code": 100}],
          "semi": ["error", "always"],
          "simple-import-sort/imports": "error",
          "simple-import-sort/exports": "error",
          "@typescript-eslint/no-unused-vars": "off",
          "unused-imports/no-unused-imports": "error",
          "unused-imports/no-unused-vars": [
            "error",
            { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
          ],
          "react/display-name": "off",
          "@tanstack/query/exhaustive-deps": "error",
          "@tanstack/query/no-rest-destructuring": "warn",
          "@tanstack/query/stable-query-client": "error"
        }
      }
          kebabCase: true, // personal style
          pascalCase: true,
        },
      },
    ],
    'react/function-component-definition': 'off',


    // Deactivated
    '@typescript-eslint/dot-notation': 'off', // paths are used with a dot notation
    '@typescript-eslint/no-misused-promises': 'off', // onClick with async fails
    '@typescript-eslint/no-non-null-assertion': 'off', // sometimes compiler is unable to detect
    '@typescript-eslint/no-unnecessary-condition': 'off', // remove when no static data is used
    '@typescript-eslint/require-await': 'off', // Server Actions require async flag always
    '@typescript-eslint/prefer-nullish-coalescing': 'off', // personal style
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
      },
    ],
    'import/no-default-export': 'off', // Next.js components must be exported as default
    'import/no-extraneous-dependencies': 'off', // conflict with sort-imports plugin
    'import/order': 'off', // using custom sort plugin
    'no-nested-ternary': 'off', // personal style
    'no-redeclare': 'off', // conflict with TypeScript function overloads
    'react/jsx-fragments': 'off', // personal style
    'react/prop-types': 'off', // TypeScript is used for type checking

    '@next/next/no-img-element': 'off', // Temporary disabled
  },
};
