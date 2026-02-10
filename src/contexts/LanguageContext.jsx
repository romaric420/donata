import { createContext, useContext, useState, useEffect } from 'react'
import en from '../../public/locales/en.json'
import fr from '../../public/locales/fr.json'

const translations = { en, fr }

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const saved = localStorage.getItem('donota-lang')
    if (saved && translations[saved]) setLanguage(saved)
  }, [])

  const toggleLanguage = () => {
    const next = language === 'en' ? 'fr' : 'en'
    setLanguage(next)
    localStorage.setItem('donota-lang', next)
    document.documentElement.lang = next
  }

  const t = translations[language]
  const linkedinUrl = 'https://www.linkedin.com/in/vidatokodi/'

  return (
    <LanguageContext.Provider value={{ t, language, toggleLanguage, linkedinUrl }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
