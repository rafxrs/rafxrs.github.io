import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import NotFound from './components/NotFound'

/** Used by scripts/prerender.mjs to write the page's HTML at build time. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

/** Static 404 page for GitHub Pages (no JavaScript needed). */
export function renderNotFound(): string {
  return renderToString(<NotFound />)
}

export { site } from './data/content'
