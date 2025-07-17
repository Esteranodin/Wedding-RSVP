import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Notre Mariage',
  description: 'Nous vous invitons à célébrer notre union',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;700;900&family=Montserrat:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="main-container">

          <header className="header-elegant">
            <nav className="nav-container">
              <Link href="/" className="logo-header">
                <Image 
                  src="/m-logo.png" 
                  alt="Marie & Thomas" 
                  width={50} 
                  height={50}
                  className="logo-wedding-small"
                />
              </Link>
              
              <div className="nav-links">
                <Link href="/" className="nav-link">
                  Accueil
                </Link>
                <Link href="/rsvp" className="nav-link">
                  RSVP
                </Link>
                <Link href="/infos" className="nav-link">
                  Infos pratiques
                </Link>
                <Link href="/admin" className="nav-link">
                  Admin
                </Link>
              </div>
            </nav>
          </header>
          
          {children}
          
          <footer className="footer-elegant">
            <p className="mb-1">Créé avec amour pour notre mariage</p>
            <p className="text-xs opacity-70">© {new Date().getFullYear()}</p>
          </footer>
        </div>
      </body>
    </html>
  );
}