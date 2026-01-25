/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UNSPLASH_ACCESS_KEY: string
  readonly VITE_PEXELS_API_KEY: string
  readonly VITE_PIXABAY_API_KEY: string
  readonly VITE_CONTACT_FORM_ENDPOINT?: string
  readonly VITE_GA_TRACKING_ID?: string
  readonly VITE_MIXPANEL_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

