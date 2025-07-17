import RSVPForm from '../../components/PresenceForm';

export const metadata = {
  title: 'Confirmer votre présence - Notre Mariage',
  description: 'Formulaire de confirmation de présence à notre mariage',
}

export default function RSVP() {
  return (
    <>
      <h1 className="title">Confirmer votre présence</h1>
      <RSVPForm />
    </>
  );
}