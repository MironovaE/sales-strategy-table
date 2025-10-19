// env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_MOCKING: 'enabled' | 'disabled' | undefined
  readonly VITE_DEV_API_URL: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
