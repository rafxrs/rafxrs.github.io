import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { SkipLink } from './components/layout/SkipLink'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Highlights } from './components/sections/Highlights'
import { Research } from './components/sections/Research'
import { Skills } from './components/sections/Skills'
import { Work } from './components/sections/Work'
import { MotionProvider } from './components/ui/MotionProvider'

export default function App() {
  return (
    <MotionProvider>
      <SkipLink />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Highlights />
        <Work />
        <Research />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  )
}
