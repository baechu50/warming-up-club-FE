#!/bin/bash

# 사용자가 프로젝트 이름을 입력하도록 설정
read -p "📌 생성할 프로젝트 이름을 입력하세요 (기본값: my-react-app): " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-my-react-app}
PROJECT_PATH="$(pwd)/$PROJECT_NAME"

echo "🚀 프로젝트 생성: $PROJECT_PATH"
mkdir -p "$PROJECT_PATH"
cd "$PROJECT_PATH"

# Vite + React + TypeScript 프로젝트 생성
npm create vite@latest . --template react-ts
npm install

echo "📦 ESLint, Prettier, Tailwind CSS 설치..."
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier \
  eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin eslint-plugin-tailwindcss tailwindcss postcss autoprefixer

npx tailwindcss init -p

# ESLint 설정 추가
cat > .eslintrc.cjs <<EOL
module.exports = {
  root: true,
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "prettier", "tailwindcss"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "no-var": "error",
    "prefer-const": "error",
    "no-console": "warn",
    "tailwindcss/no-custom-classname": "off"
  },
  settings: {
    react: {
      version: "detect",
    },
    tailwindcss: {
      callees: ["cn"],
    },
  },
};
EOL

# Prettier 설정 추가
cat > .prettierrc <<EOL
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "tabWidth": 2
}
EOL

# Tailwind 설정 추가
cat > tailwind.config.js <<EOL
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
EOL

# PostCSS 설정 추가
cat > postcss.config.js <<EOL
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOL

# Tailwind 기본 스타일 추가
cat > src/index.css <<EOL
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ✅ Tailwind가 적용되는지 확인하기 위한 테스트 스타일 */
/* 배경색 변경 (Tailwind가 정상 작동하면 배경이 하늘색으로 나와야 함) */
body {
  @apply bg-blue-200 text-gray-900 flex justify-center items-center min-h-screen;
}
EOL

# package.json 수정 (Lint 및 Format 명령어 추가)
jq '.scripts += {
  "lint": "eslint . --ext ts,tsx",
  "lint:fix": "eslint . --ext ts,tsx --fix",
  "format": "prettier --write ."
}' package.json > package.tmp.json && mv package.tmp.json package.json

echo "✅ 프로젝트 설정 완료!"
echo "다음 명령어를 실행하세요:"
echo "cd $PROJECT_PATH && npm run dev"