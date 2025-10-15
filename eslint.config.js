import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import pluginReact from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginSonarjs from 'eslint-plugin-sonarjs'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      unicorn: eslintPluginUnicorn, //Широкий спектр правил для улучшения чистоты и ясности кода, устранения малозначимых конструктивных недостатков.
      'simple-import-sort': simpleImportSort, // Упорядочивание импортируемых модулей
      'jsx-a11y': jsxA11y, // Проверка доступности элементов JSX для слабовидящих и других категорий пользователей.
    },
    extends: [
      //Базовые правила идут первыми
      js.configs.recommended, // Базовая рекомендация от команды ESLint
      ...tseslint.configs.recommendedTypeChecked, // Типобезопасные правила для TypeScript
      ...tseslint.configs.stylisticTypeChecked, // Стилистические правила для TypeScript
      // Правила React следуют сразу за базовой настройкой
      reactX.configs['recommended-typescript'], // Рекомендованные правила для React с поддержкой TypeScript
      reactDom.configs.recommended, // Стандартные правила для ReactDOM
      reactHooks.configs['recommended-latest'], // Рекомендации по использованию хуков React
      reactRefresh.configs.vite, // Поддержка горячей замены компонентов в процессе разработки (Hot Module Replacement, HMR).
      pluginReact.configs.flat.recommended, // Плагины для общих рекомендаций React
      pluginReact.configs.flat['jsx-runtime'], // С React 17 и выше введена новая трансформация JSX, которая не требует явного импорта React в компонентах.
      //Импорты и безопасность
      importPlugin.flatConfigs.recommended, // Отслеживает правильность импорта модулей, предупреждая дублирование, циклические зависимости и отсутствие модулей.
      importPlugin.flatConfigs.typescript, // Отслеживает правильность импорта модулей, предупреждая дублирование, циклические зависимости и отсутствие модулей для TypeScript.
      pluginSonarjs.configs.recommended, // Анализ безопасности кода

      //Форматирование
      eslintPluginPrettierRecommended, // Форматирование кода (должен быть последним элементом)
    ],
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
    rules: {
      'sonarjs/fixme-tag': 'off', // Выключаем правило фиксов SonarJS
      'sonarjs/pseudo-random': 'off', // Выключаем проверку псевдослучайных чисел
      'unicorn/filename-case': 'off', // Выключаем проверки именования файлов
      'unicorn/prevent-abbreviations': 'off', // Разрешаем сокращения
      'import/no-unresolved': ['error', { ignore: ['.svg'] }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react'], // Импорты React
            ['^@'], // Пакеты с префиксом "@"
            ['^[a-zA-Z0-9]', '^\\.'], // Локальные файлы и обычные пакеты
            ['^\\/'], // Абсолютные пути
            ['^node:'], // Стандартные модули Node.js
          ],
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.builtin,
      },
    },
  },
  // 🔧 Специальное правило для vite-env.d.ts: отключаем type-checked linting
  {
    files: ['vite-env.d.ts'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  // ✅ Отключаем fast refresh правило для компонентов shadcn
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
      'sonarjs/prefer-read-only-props': 'off',
      'sonarjs/table-header': 'off',

      // На всякий случай (хотя в TS должен быть неактивен):
      'react/prop-types': 'off',
    },
  },
])
