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
  // 1. 순환 참조를 일으키는 설정을 개별적으로 분리하여 가져옵니다.
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),

  // 2. Prettier 설정을 별도의 객체로 분리 (직접 주입 방식)
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

  // 3. 글로벌 무시 설정 (이 부분이 중요합니다)
  {
    ignores: [
      '.next/**/*',
      'node_modules/**/*',
      'dist/**/*',
      'public/**/*',
      'out/**/*',
      'eslint.config.mjs', // 설정 파일 자체도 검사에서 제외하여 안전성 확보
    ],
  },
];

export default eslintConfig;
