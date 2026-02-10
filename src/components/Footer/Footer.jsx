import { useLanguage } from '../../contexts/LanguageContext'
import './Footer.css'

// ⚠️ IMPORTANT : Décommente la ligne ci-dessous une fois que tu as mis l'image "footer-bg.png" dans src/assets
// import footerBg from '../../assets/footer-bg.png'

const Footer = () => {
  const { t } = useLanguage()

  // En attendant l'image, on utilise null (ou tu peux mettre une URL provisoire)
  // Une fois l'image importée, remplace 'null' par 'footerBg' ci-dessous :
  const bgImage = null; // Remplace par footerBg quand le fichier est là

  return (
    <footer className="footer">
      {/* IMAGE ARRIÈRE-PLAN (S'affiche si bgImage est défini) */}
      <div
        className="footer__bg-image"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
          opacity: bgImage ? 0.25 : 0 // Cache le calque si pas d'image
        }}
      ></div>

      {/* COUCHE D'ASSOMBISSEMENT (Toujours visible pour le style) */}
      <div className="footer__overlay"></div>

      <div className="footer__container">

        {/* 1. GAUCHE : IDENTITÉ */}
        <div className="footer__brand">
          <div className="footer__logo-icon">
            <span>D</span>
          </div>
          <div className="footer__logo-text">
            <span className="brand-name">DONOTA</span>
            <span className="brand-sub">Advisory</span>
          </div>
        </div>

        {/* 2. CENTRE : COPYRIGHT */}
        <div className="footer__center">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Donota Advisory. {t.footer.copyright || "All rights reserved."}
          </p>
        </div>

        {/* 3. DROITE : LOCALISATION */}
        <div className="footer__location">
          <div className="location-icon-box">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <span className="location-text">{t.footer.location || "Paris, France"}</span>
        </div>

      </div>
    </footer>
  )
}

export default Footer