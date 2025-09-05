import Link from 'next/link';

export const metadata = {
  title: 'Mariage ♥ Infos pratiques',
  description: 'Toutes les informations pratiques pour notre mariage',
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
              <strong>Jardins de l'abbaye de Pébrac</strong><br />
              Le Bourg, 43300 Pébrac<br />
            </p>
            <p className="text-strong">
              14h30</p>
            <p className="text-readable text-center mb-4">
              -&nbsp;Essayez d'être là 15-20 minutes avant&nbsp;-
            </p>

            <h3 className="text-decorative mb-2">Soirée</h3>
            <p className="text-readable text-center">
              <strong>Le Pradel</strong><br />
              43300 Saint-Julien-des-Chazes<br />
            </p>
            <p className="text-strong">
              18h00</p>
            <p className="text-readable text-center mb-4">
              -&nbsp;À 15 min de la cérémonie&nbsp;-
            </p>
          </div>

          {/* Transport */}
          <div className="card-elegant">
            <h2 className="title-secondary mb-6">🚀 Venir</h2>

            <h3 className="text-decorative">À Pébrac</h3>
            <p className="text-readable text-center mb-5">
              Un seul "parking" dans ce minuscule village et un seul gros bâtiment... <br />
              <strong>Vous devriez trouver facilement&nbsp;!</strong>
            </p>
            <div style={{ width: "100%", height: "300px", borderRadius: "12px", overflow: "hidden" }} className="mb-16">
              <iframe
                title="Carte Abbaye Pébrac"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2819.731844739699!2d3.506662112500675!3d45.030368762158446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f619842cb284dd%3A0x27fb8b148e4a3fa4!2sAbbaye%20Notre-Dame%20de%20P%C3%A9brac!5e0!3m2!1sfr!2sfr!4v1757058713672!5m2!1sfr!2sfr"
              ></iframe>
            </div>

            <h3 className="text-decorative">À la fête !</h3>
            <p className="text-readable mb-5">
              Il y aura sans doute des voitures à suivre qui sauront où aller&nbsp;^^ <br />
              Si jamais, voici des indications (les GPS risquent de vous faire passer par une piste foretière...)
            </p>
            <div style={{ width: "100%", height: "300px", borderRadius: "12px", overflow: "hidden" }} className='mb-6'>
              <iframe
                title="Carte Abbaye Pébrac"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2819.246254090661!2d3.5880250125010344!3d45.040224461505495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f61b5ccc6b11f9%3A0x2dd6ba97031ba781!2sDomaine%20du%20Pradel!5e0!3m2!1sfr!2sfr!4v1757059258529!5m2!1sfr!2sfr"
              ></iframe>
            </div>
            <p className="text-strong">En venant de Pébrac</p>
            <p className="text-readable mb-5">
              Prendre la D30, direction <strong>Saint-Arcons-d'Allier</strong>,<br />
              → traverser l'Allier,<br />
              → prendre à droite (continuer sur la même route) et <strong>ne pas rentrer dans le village</strong> de St-Arcons<br />
              → au prochain croisement, prendre à droite sur la D48, <strong>dir. St-Julien-des-Chazes</strong>, Prades, Chapelle St Julien, Église de Prades, ...<br />
              → <strong>NE PAS RENTRER</strong> dans le village de St-Julien-des-Chazes et donc ne pas traverser un pont rouge !<br />
              → continuer jusqu'à dépasser sur votre gauche une <strong>petite chapelle</strong> en travaux et aller jusqu'au bout du chemin, il devrait y avoir de la lumière&nbsp;🤪<br />
            </p>
            <p className="text-strong">En venant de Sainté</p>
            <p className="text-readable">
              Direction <strong>Saint-Arcons-d'Allier</strong> et <strong>ne pas rentrer dans le village</strong><br />
              → au croisement, prendre à gauche sur la D48, <strong>dir. St-Julien-des-Chazes</strong>, Prades, Chapelle St Julien, Église de Prades, ...<br />
              → <strong>NE PAS RENTRER</strong> dans le village de St-Julien-des-Chazes et donc ne pas traverser un pont rouge !<br />
              → continuer jusqu'à dépasser sur votre gauche une <strong>petite chapelle</strong> en travaux et aller jusqu'au bout du chemin, il devrait y avoir de la lumière&nbsp;🤪<br />
            </p>
          </div>

          {/* Dress code */}
          <div className="card-elegant">
            <h2 className="title-secondary mb-6 text-flashy-pink">👕 Dress code</h2>
            <p className="text-readable mb-3">
              McDo le dit si bien 🙄 <strong>VENEZ COMME VOUS ÊTES !</strong>
            </p>
            <p className="text-readable mb-3">
              <strong>Chaussures :</strong> Jardin = herbe 😅 (peut-être éviter les talons aiguilles)
            </p>
            <p className="text-readable mb-5">
              <strong>Attention !</strong> <br />
              ❄️🌡️ L'Allier coule à quelques mètres, habillez-vous <strong>CHAUDEMENT</strong>
            </p>
            <p className="text-readable">
              🎃 Ok, c'est Samain (Halloween)...<br />Pour la <strong>cérémonie</strong> on aimerait bien que ça reste un mariage <strong>sans déguisement...</strong> mais le soir VOUS FAÎTES COMME VOUS VOULEZ !
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
              <strong>Priorité aux copains bringueurs </strong> qui pourront dormir en sécurité sans reprendre la voiture. Mais premier arrivé, premier servi ! Réservez<a href="/rsvp" className="font-bold text-rose-400"> ici</a>
            </p>
            <p className="text-readable mb-4">
              → Il y a 27 places (max 30 places en comptant les fauteuils pour les grands bringueurs). <br />
              → <strong>ATTENTION ! </strong> Bizarrement les deux dortoirs (mixtes) ont des "zones dodo" n'ont pas pour 2 mais <strong>POUR 3 PERSONNES</strong><br />
              → Allez voir les photos sur <a href="https://www.domaine-du-pradel.fr/le-gite-de-groupe/" target="_blank" rel="noopener noreferrer" className="font-bold text-rose-400">le site du  gîte</a><br />
              ✔️ Il va donc falloir accepter de dormir à côté de quelqu'un que vous ne connaissez pas trop... ou pas du tout ^^ 💤💨
            </p>

            <h3 className="text-decorative mb-2">Dans le coin</h3>
            <p className="text-readable mb-3">
              Sinon, voici une liste (non exhaustive) d'adresses à proximité&nbsp;:
            </p>
            <p className="text-readable mb-4">
              • <strong>Chalet de la Source</strong> - env. 5 min -
              <a href="https://chalet-source.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-rose-400"> ici</a><br />
              • <strong>Le Moulin</strong> - env. 10 min -
              <a href="https://www.lemoulindursapt.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-rose-400"> ici</a><br />
              • <strong>Art et Création</strong> - env. 15 min -
              <a href="https://www.artetcreation.nl/fr/" target="_blank" rel="noopener noreferrer" className="font-bold text-rose-400"> ici</a><br />
            </p>
            <p className="text-readable text-sm">
              <em>Pensez à réserver rapidement (on est désolés pour le timing serré)</em>
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
              • <strong>Pour dormir </strong><br />Sac de couchage ou de quoi faire un lit une place (drap housse, couverture...)<br /> + taie d'oreiller rectangulaire <br />
              • <strong>Pour se laver</strong> (il y a des sanitaires 🚿)<br /> Votre nécessaire de toilette + serviette <br />
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
              Confirmer ma présence
              <div className="text-sm mt-1 opacity-80">Avant le 25 septembre 2025</div>
            </Link>
          </div>
        </div>
      </section >
    </div >
  );
}