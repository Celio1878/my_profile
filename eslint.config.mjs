// ESLint flat config for bys_ui
// Minimal, aligned with project guidelines and React Router SSR setup
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  // Ignore build artifacts and dependencies
  {
    ignores: ["node_modules/", "build/", "dist/", ".react-router/"],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      // Recommended baseline
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Project-specific minimal guardrails
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",
      "react/react-in-jsx-scope": "off", // React 17+ JSX transform
      // We use TypeScript for props typing; PropTypes are redundant and noisy
      "react/prop-types": "off",
    },
  },
];
