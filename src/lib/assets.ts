import publicFiles from 'virtual:public-assets'

/** Resolves a path inside /public against the deploy base ("/" for a GitHub Pages user site). */
export function assetUrl(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

/**
 * True when the file was present in /public at build time. Used to hide links and show marked
 * placeholders instead of pointing visitors at a file that would 404.
 */
export function hasAsset(path: string): boolean {
  return publicFiles.has('/' + path.replace(/^\//, ''))
}
