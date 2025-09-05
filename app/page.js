import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Mariage ♥ Ben & Marion",
  description: "Bienvenue sur le site du mariage de Ben & Marion",
  robots: "noindex, nofollow"
};

// ...existing code...
export default function Home() {
  return (
    <div className="home-bg">
      <section className="content-zone">
        <div className="logo-container">
          <Image
            src="/m-logo.png"
            alt="Logo du mariage"
            width={140} 
            height={120}
            className="logo-wedding"
          />
          <h1 className="title-main">
            Ben & Marion
          </h1>
        </div>
        <p className="text-readable text-center py-2">
          On aimerait que vous soyez avec nous pour célébrer notre mariage 🖤
        </p>
        <div className="text-center">
          <h2 className="text-decorative">vendredi 31&nbsp;octobre</h2>
          <h3 className="title-secondary py-4">À partir de 14h30 </h3>
        </div>
        <div className="buttons-container my-6">
          <Link
            href="/infos"
            className="btn-elegant"
          >
            Toutes les infos ici
          </Link>
          <Link
            href="/rsvp"
            className="btn-elegant"
          >
            Pour confirmer votre présence (avant le 25&nbsp;septembre 2025), c'est ici !
          </Link>
        </div>
      </section>
    </div>
  );
}