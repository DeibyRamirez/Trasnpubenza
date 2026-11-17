/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POWERBI_EMBED_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
