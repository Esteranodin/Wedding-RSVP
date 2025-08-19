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
            width={190}
            height={160}
            className="logo-wedding"
          />
          <h1 className="title-main">
            Ben & M
          </h1>
        </div>
        <div className="text-decorative text-center mb-6">
          31 • Octobre • 2025
        </div>

        <p className="text-readable text-center mb-6">
       Voulez-vous, vous joindre à nous pour célébrer notre mariage</p>

        <div className="text-center mb-6">
          <div className="title-secondary mb-2">15h30</div>
          <div className="text-decorative">à L'abbaye de Pébrac</div>
        </div>

        <div className="buttons-container grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Link
            href="/infos"
            className="btn-elegant hover-lift md:mr-6"
          >
            Toutes les infos ici
          </Link>
          <Link
            href="/rsvp"
            className="btn-elegant hover-lift md:ml-6"
          >
            Pour confirmer votre présence (avant le 15 septembre 2025), c'est ici !
          </Link>
        </div>
      </section>
    </div>
  );
}