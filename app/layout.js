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
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;700;900&family=Montserrat:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="main-container">
          <header className="header-elegant">
            <nav className="nav-container">
              <Link href="/admin" onClick={closeMenu}>
                <Image 
                  src="/m-logo.png" 
                  alt="Marion & Benjamin" 
                  width={100} 
                  height={150}
                  className="logo-wedding-small"
                />
              </Link>
              
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
          
          <footer className="footer-elegant">
            <p className="text-xs opacity-70">© Les Chouks {new Date().getFullYear()}</p>
          </footer>
        </div>
      </body>
    </html>
  );
}