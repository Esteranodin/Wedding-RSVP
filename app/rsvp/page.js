import RSVPForm from '../../components/PresenceForm';
import Link from 'next/link';

export const metadata = {
  title: 'Confirmer votre présence - Notre Mariage',
  description: 'Formulaire de confirmation de présence à notre mariage',
  robots: 'noindex, nofollow'
}

export default function RSVP() {
  return (
    <div className="page-bg">
      <div className="content-wrapper flex flex-col">
        <section className="form-elegant">
          <div className="gap-8 flex justify-between">
            <Link href="/" className="text-link">
              ←&nbsp;Accueil
            </Link>
            <Link href="/infos" className="text-link">
              Infos&nbsp;→
            </Link>
          </div>
          <h1 className="title">Confirmer votre présence</h1>
          <RSVPForm />
        </section>
      </div>
    </div>
  );
}