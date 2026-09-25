/// <reference types="vite/client" />

/** Paths of every file in /public at build time, e.g. "/media/demo.mp4". */
declare module 'virtual:public-assets' {
  const files: ReadonlySet<string>
  export default files
}

/** Year of the build, injected by vite.config.ts. */
declare const __BUILD_YEAR__: number
