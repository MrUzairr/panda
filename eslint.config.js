import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin,
      'unused-imports': unusedImports, 
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Enforce a blank line before return statements
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
      ],

      // Enforce the use of 'const' over 'let' for variable declarations
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false,
        },
      ],


      // Enforce single quotes for strings
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],

      // Enforce no unnecessary else blocks after return statements
      'no-else-return': 'error',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React specific rules
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-no-target-blank': [
        'warn',
        {
          allowReferrer: true,
        },
      ],
      'react/no-multi-comp': [
        'error',
        {
          ignoreStateless: true,
        },
      ],
      'react/sort-comp': [
        'error',
        {
          order: [
            'static-methods',
            'instance-variables',
            'lifecycle',
            'getters',
            'setters',
            '/^on.+$/',
            '/^handle.+$/',
            '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
            'instance-methods',
            'everything-else',
            'rendering',
          ],
        },
      ],

      // Disallow unused variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],

      'func-call-spacing': 'error', 

      // Enforce camelcase for variable names
      camelcase: 'error',

      // Disallow the use of `any` type
      '@typescript-eslint/no-explicit-any': 'warn',

      // No unused expressions
      '@typescript-eslint/no-unused-expressions': 'error',

      // Disallow empty functions
      '@typescript-eslint/no-empty-function': 'off',

      // Enforce max parameters for functions
      'max-params': ['warn', 5],

      // Max lines for files
      'max-lines': [
        'off',
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      // Enforce no assignment to function parameters
      'no-param-reassign': 'warn',

      // Ensure curly braces around all control flow statements
      curly: ['error', 'all'],

      // Enforce consistent use of commas
      'comma-dangle': [
        'error',
        { 
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',   
        },
      ],

      // Enforce no duplicate imports
      'import/no-duplicates': 'warn',

      // Prevent the use of extraneous dependencies
      'import/no-extraneous-dependencies': 'error',

      // Disallow the use of relative packages
      'import/no-relative-packages': 'warn',

      // Enforce unused imports cleanup
      'unused-imports/no-unused-imports': 'warn',
    },
  }
)
