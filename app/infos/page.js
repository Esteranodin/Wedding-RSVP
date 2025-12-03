import Link from 'next/link';
import BackToTop from '../../components/BackToTop';

export const metadata = {
  title: 'Mariage ♥ Infos pratiques',
  description: 'Toutes les informations pratiques pour notre mariage',
  robots: 'noindex, nofollow'
}

export default function Infos() {
  return (
    <div className="page-bg">
      <section className="content-wrapper">
        <div className="form-elegant">
          <Link href="/" className="text-link">
            ←&nbsp;Accueil
          </Link>
          <h1 className="title">Les infos ▼</h1>
          <p className="text-readable text-center mb-3">
            Pas mal de renseignements suivent, prenez le temps de tout lire<br />
            <strong>Merci !</strong>
          </p>

          {/* Lieux */}
          <div className="card-elegant">
            <h2 className="title-secondary">📍 Lieux & horaires</h2>
            <h3 className="text-decorative mb-2">Célébration</h3>
            <p className="text-readable text-center">
              <strong>Nom du lieu</strong><br />
              Adresse<br />
            </p>
            <p className="text-strong">
              heure</p>
            <p className="text-readable text-center mb-4">
              -&nbsp;Essayez d'être là 15-20 minutes avant&nbsp;-
            </p>

            <h3 className="text-decorative mb-2">Soirée</h3>
            <p className="text-readable text-center">
              <strong>Nom du lieu</strong><br />
              Adresse<br />
            </p>
            <p className="text-strong">
              heure</p>
            <p className="text-readable text-center mb-4">
              -&nbsp;À durée de la cérémonie&nbsp;-
            </p>
          </div>

          {/* Transport */}
          <div className="card-elegant">
            <h2 className="title-secondary mb-6">🚀 Venir</h2>

            <h3 className="text-decorative">Lieu cérémonie</h3>
            <p className="text-readable text-center mb-5">
              description<br />
              <strong>infos supplémentaires</strong>
            </p>
            <div style={{ width: "100%", height: "300px", borderRadius: "12px", overflow: "hidden" }} className="mb-16">
              <iframe
                title="Carte lieux cérémonie"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42045.53394801112!2d2.077995206332162!3d48.80392019134736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67db475f420bd%3A0x869e00ad0d844aba!2s78000%20Versailles!5e0!3m2!1sfr!2sfr!4v1764769189407!5m2!1sfr!2sfr"
              ></iframe>
            </div>

            <h3 className="text-decorative">À la fête !</h3>
            <p className="text-readable mb-5">
              Il y aura sans doute des voitures à suivre qui sauront où aller&nbsp;^^ <br />
              Si jamais, voici des indications
            </p>
            <div style={{ width: "100%", height: "300px", borderRadius: "12px", overflow: "hidden" }} className='mb-6'>
              <iframe
                title="Carte lieux fête"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42045.53394801112!2d2.077995206332162!3d48.80392019134736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67db475f420bd%3A0x869e00ad0d844aba!2s78000%20Versailles!5e0!3m2!1sfr!2sfr!4v1764769189407!5m2!1sfr!2sfr"
              ></iframe>
            </div>
            <p className="text-strong">En venant de lieux 1</p>
            <p className="text-readable mb-5">
              Prendre route, direction <strong>ville / village</strong>,<br />
              → indications supplémentaires<br />
              → indications supplémentaires<br />
              → indications supplémentaires<br /> 
            </p>
            <p className="text-strong">En venant de lieux 2</p>
            <p className="text-readable">
              Prendre route, direction <strong>ville / village</strong>,<br />
              → indications supplémentaires<br />
              → indications supplémentaires<br />
              → indications supplémentaires<br /> 
            </p>
          </div>

          {/* Enfants */}
          <div className="card-elegant">
            <h2 className="title-secondary mb-6 text-flashy-pink">👶 Les bambins</h2>
            <p className="text-readable mb-3">
              Question délicate... mais nous avons choisi <strong>de ne pas convier les enfants de moins de 12 ans</strong>. <br />
              Nous espérons que vous nous en tiendrez pas rigueur et trouverez facilement une solution de garde. <br />
              Les lieux ne sont pas adaptés aux petits et nous aimerions que vous puissiez profiter pleinement de la soirée ! <br />
              Merci de votre compréhension 🙏
            </p>
          </div>

          {/* Dress code */}
          <div className="card-elegant">
            <h2 className="title-secondary mb-6 text-flashy-pink">👕 Dress code</h2>
            <p className="text-readable mb-3">
             précisions sur le dress code
            </p>
            <p className="text-readable mb-3">
              <strong>Chaussures :</strong>  précisions 
            </p>
            <p className="text-readable mb-5">
              <strong>Attention !</strong> <br />
              ❄️🌡️ habillez-vous <strong>CHAUDEMENT</strong>
            </p>
          </div>

          {/* Hébergement */}
          <div className="card-elegant">
            <h2 className="title-secondary mb-6">🛏️ Où dormir</h2>
            <h3 className="text-decorative mb-2">Sur place </h3>
            <p className="text-readable mb-3">
              On fait la fête dans un gîte pour qu'il soit possible de dormir sur place.
            </p>
            <p className="text-readable mb-3">
              <strong>Priorité aux copains bringueurs</strong> qui pourront dormir en sécurité sans reprendre la voiture. Mais premier arrivé, premier servi ! Réservez<a href="/rsvp" className="font-bold text-rose-400"> ici</a>
            </p>
            <p className="text-readable mb-4">
              →  précisions  <br />
              → précisions  <br />
              → Allez voir les photos sur <a href="" target="_blank" rel="noopener noreferrer" className="font-bold text-rose-400">le site du gîte</a><br />
            </p>

            <h3 className="text-decorative mb-2">Dans le coin</h3>
            <p className="text-readable mb-3">
              Sinon, voici une liste (non exhaustive) d'adresses à proximité&nbsp;:
            </p>
            <p className="text-readable mb-4">
              • <strong>Gîte</strong> - env. 5 min -
              <a href="" target="_blank" rel="noopener noreferrer" className="font-bold text-rose-400"> ici</a><br />
              • <strong>Hotel</strong> - env. 10 min -
              <a href="" target="_blank" rel="noopener noreferrer" className="font-bold text-rose-400"> ici</a><br />
              • <strong>Maison d'hôtes</strong> - env. 15 min -
              <a href="" target="_blank" rel="noopener noreferrer" className="font-bold text-rose-400"> ici</a><br />
            </p>
            <p className="text-readable text-sm">
              <em>Pensez à réserver</em>
            </p>
          </div>

          {/* Conseils */}
          <div className="card-elegant">
            <h2 className="title-secondary mb-4 ">🥐 Le lendemain</h2>
            <h3 className="text-decorative mb-2">Petit(gros)-déjeuner</h3>
            <p className="text-readable mb-3">
              Si vous le souhaitez, du miam et du chaud vous attendront au gîte à partir de ... 10h30 / 11h00.
            </p>
            <p className="text-readable mb-3">
              Départ tranquillement dans l'après-midi.
            </p>
          </div>

          {/* Autres infos */}
          <div className="card-elegant">
            <h2 className="title-secondary mb-4 ">💡 Pensez à prendre</h2>
            <p className="text-readable">
              • <strong>Pour dormir </strong><br />infos type sac de couchage, ...<br />
              • <strong>Pour se laver</strong><br /> Votre nécessaire de toilette + serviette <br />
              • <strong>Bain nordique</strong> (pour les courageux, le samedi matin)<br /> Votre maillot de bain 🩱 <br />
              • 🧣 <strong>des PULLS et chaussures chaudes</strong>
            </p>
          </div>

          {/* Cadeaux */}
          <div className="card-elegant">
            <h2 className="title-secondary mb-4 ">🎁 Cadeau</h2>
            <p className="text-readable mb-3">
              Votre présence c'est déjà parfait!
            </p>
            <p className="text-readable mb-3">
              Mais si vous le souhaitez, il y aura une <strong>urne</strong> sur place qui servira à financer notre voyage de noces.
            </p>
          </div>

          {/* Bouton RSVP */}
          <div className="text-center mt-8">
            <Link href="/rsvp" className="btn-elegant hover-lift">
              Confirmer ma présence <br /> (avant date)
            </Link>
          </div>
        </div>
      </section>
      <BackToTop />
    </div>
  );
}