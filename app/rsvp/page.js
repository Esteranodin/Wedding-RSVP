import RSVPForm from '../../components/PresenceForm';
import Link from 'next/link';

export const metadata = {
  title: 'Confirmer votre présence - Notre Mariage',
  description: 'Formulaire de confirmation de présence à notre mariage',
}

export default function RSVP() {
  return (
    <div className="page-bg">
      <div className="content-wrapper">
        <div className="form-elegant">
          <Link href="/" className="inline-block mb-6 text-decorative hover:opacity-70 transition-opacity">
            ← Retour à l'accueil
          </Link>
          
          <h1 className="title-main text-center mb-8">Confirmer votre présence</h1>
          <RSVPForm />
          <div className="text-center mt-8">
            <p className="text-readable">Merci de votre réponse !</p>
          </div>
        </div>
      </div>
    </div>
  );
}