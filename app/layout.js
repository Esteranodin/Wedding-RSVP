import './globals.css';

export const metadata = {
  title: 'Notre Mariage',
  description: 'Confirmez votre présence à notre mariage',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <div className="container">
          <main className="main">
            {children}
          </main>
          <footer className="footer">
            <p>Créé avec ❤️ pour notre mariage - Les Chouks - 2025</p>
          </footer>
        </div>
      </body>
    </html>
  );
}