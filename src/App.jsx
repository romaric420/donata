import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import WhatWeDo from './components/WhatWeDo/WhatWeDo'
import ExpertiseScroller from './components/ExpertiseScroller/ExpertiseScroller'
import Services from './components/Services/Services'
import TrackRecord from './components/TrackRecord/TrackRecord'
import WhyDonota from './components/WhyDonota/WhyDonota'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <a href="#services" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-copper-500 focus:text-white focus:rounded-lg">
          Skip to content
        </a>
        <Navbar />
        <main>
          <Hero />
          <WhatWeDo />
          <Services />
          <TrackRecord />
          <WhyDonota />
          <About />
          <ExpertiseScroller />
          <Contact />
        </main>
        <Footer />
        <AnimatePresence>
          {showScrollTop && <ScrollToTop />}
        </AnimatePresence>
      </div>
    </LanguageProvider>
  )
}

export default App
