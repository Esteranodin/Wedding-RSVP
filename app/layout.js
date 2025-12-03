"use client";

import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fermer le menu quand on clique sur un lien
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fermer le menu si on redimensionne la fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <html lang="fr">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;700;900&family=Montserrat:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="main-container">
          <header className="header-elegant">
            <nav className="nav-container">
            
                <Image 
                  src="/m-logo.png" 
                  alt="Prénom & Prénom" 
                  width={100} 
                  height={150}
                  className="logo-wedding-small"
                />
              
              <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <Link href="/" className="nav-link" onClick={closeMenu}>
                  Accueil
                </Link>
                <Link href="/infos" className="nav-link" onClick={closeMenu}>
                  Infos pratiques
                </Link>
                <Link href="/rsvp" className="nav-link" onClick={closeMenu}>
                  Votre présence&nbsp;?
                </Link>
              </div>

              <div 
                className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="burger-line"></div>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
              </div>
            </nav>
          </header>
          
          {children}
          
          <footer className="footer-elegant mt-auto">
          <p>© Esteranodin{new Date().getFullYear()}</p>
          <Link href="/admin" onClick={closeMenu} className='text-rose-400 text-lg font-semibold'>Espace témoins + mariés</Link>
          </footer>
        </div>
      </body>
    </html>
  );
}