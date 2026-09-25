import '@fontsource-variable/geist/wght.css'
import '@fontsource-variable/geist-mono/wght.css'
import './index.css'

import { StrictMode, startTransition } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (container.firstElementChild) {
  // Production: the HTML was prerendered at build time, so attach to it. Hydrating inside a
  // transition lets React yield to the browser instead of blocking the main thread.
  startTransition(() => {
    hydrateRoot(container, app)
  })
} else {
  // Development: render from scratch.
  createRoot(container).render(app)
}
