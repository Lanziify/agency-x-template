import tseslint from '@typescript-eslint/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import boundaries from 'eslint-plugin-boundaries';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    plugins: {
      boundaries: boundaries,
      simpleImportSort: simpleImportSort,
      tseslint: tseslint,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
      'boundaries/mode': 'full',
      'boundaries/include': ['**/*'],
      'boundaries/elements': [
        {
          type: 'feature',
          pattern: 'features/*/**/*',
          capture: ['featureName'],
        },
        {
          type: 'shared',
          pattern: ['app/collections/**', 'app/blocks/**/*', 'components/**/*', 'lib/**'],
        },
        {
          type: 'app',
          pattern: 'app/(app)/**/*',
        },
        {
          type: 'config',
          pattern: 'config/**',
        },
        {
          type: 'neverImport',
          pattern: ['**/*.test.*', '**/*.spec.*'],
        },
      ],
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'boundaries/no-unknown': 'error',
      // 'boundaries/no-unknown-files': 'error',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'shared',
              allow: ['shared', 'config'],
            },
            { from: 'config', allow: ['shared', 'feature'] },
            {
              from: ['feature'],
              allow: ['shared', ['feature', { featureName: '${from.featureName}' }], 'config'],
            },
            {
              from: ['app', 'neverImport'],
              allow: ['shared', 'feature', 'app', 'config'],
            },
          ],
        },
      ],
      'simpleImportSort/imports': [
        'error',
        {
          groups: [
            ['^react', '^next'],
            ['^payload', '^@payload'],
            ['^@app'],
            ['^@collections'],
            ['^@blocks'],
            ['^@components'],
            ['^@features/.*/components'],
            ['^@features/.*/lib'],
            ['^@features/.*/queries'],
            ['^@features/.*/service'],
            ['^@lib'],
            ['^@config'],
            ['^\\u0000'],
            ['^\\.'],
          ],
        },
      ],
      'simpleImportSort/exports': 'error',
    },
  },
]);

export default eslintConfig;
