"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="home-bg">
      <section className="content-zone">
        <div className="logo-container">
          <Image
            src="/m-logo.png"
            alt="Logo du mariage"
            width={140} // taille réduite pour mobile
            height={120}
            className="logo-wedding"
          />
          <h1 className="title-main">
            Ben & Marion
          </h1>
        </div>
        <p className="text-readable">
          On aimerait que vous soyez avec nous pour célébrer notre mariage 🖤
        </p>
        <div className="text-center mb-4">
          <div className="text-decorative">vendredi 31&nbsp;octobre</div>
          <div className="title-secondary mb-2">À partir de 14h30 </div>
        </div>
        <div className="buttons-container mt-6">
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
            Pour confirmer votre présence (avant le 20&nbsp;septembre 2025), c'est ici !
          </Link>
        </div>
      </section>
    </div>
  );
}