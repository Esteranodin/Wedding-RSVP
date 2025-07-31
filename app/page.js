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
         Si vous avez envie de vous joindre à nous pour célébrer notre mariage</p>

        <div className="text-center mb-6">
          <div className="title-secondary mb-2">15:30</div>
          <div className="text-decorative">L'abbaye de Pébrac</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link
            href="/rsvp"
            className="btn-elegant hover-lift"
          >
            Confirmer ma présence
            <div className="text-sm mt-1 opacity-80 normal-case">Répondre avant le 30 août 2025</div>
          </Link>

          <Link
            href="/infos"
            className="btn-elegant hover-lift"
          >
            Informations pratiques
            <div className="text-sm mt-1 opacity-80 normal-case">Tous les détails</div>
          </Link>
        </div>
      </section>
    </div>
  );
}