/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BRAPI_API_KEY: string;
  // você pode adicionar outras variáveis de ambiente aqui
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
