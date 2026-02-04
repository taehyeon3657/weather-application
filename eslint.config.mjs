import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  basePath: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'no-unused-vars': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/self-closing-comp': 'error',
    },
  },

  {
    ignores: [
      '.next/**/*',
      'node_modules/**/*',
      'dist/**/*',
      'public/**/*',
      'out/**/*',
      'eslint.config.mjs',
    ],
  },
];

export default eslintConfig;
