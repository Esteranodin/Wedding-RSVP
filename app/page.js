import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className="title">Notre Mariage</h1>
      
      <p className="description">
        Nous sommes heureux de vous inviter à notre mariage le [Date] à [Lieu].
      </p>

      <div className="grid">
        <Link href="/rsvp" className="card">
          <h2>Confirmer ma présence &rarr;</h2>
          <p>Indiquez-nous si vous serez présent(e) à notre mariage.</p>
        </Link>
      </div>
    </>
  );
}