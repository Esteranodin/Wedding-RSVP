import Link from 'next/link';

export const metadata = {
  title: 'Informations pratiques - Notre Mariage',
  description: 'Toutes les informations pratiques pour notre mariage',
}

export default function Infos() {
  return (
    <div className="page-bg">
      <div className="content-wrapper">
        <div className="form-elegant w-full max-w-4xl">
          <Link href="/" className="inline-block mb-6 text-decorative hover:opacity-70 transition-opacity">
            ← Retour à l'accueil
          </Link>
          
          <h1 className="title-main text-center mb-8">Les infos</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-elegant">
              <h2 className="title-secondary mb-4 text-flashy-purple">📍 Lieu et horaires</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-decorative mb-2">Cérémonie</h3>
                  <p className="text-readable">
                    <strong>Château de Versailles</strong><br/>
                    Place d'Armes, 78000 Versailles<br/>
                    <span className="text-flashy-green font-semibold">19h30</span>
                  </p>
                </div>
                <div>
                  <h3 className="text-decorative mb-2">Réception</h3>
                  <p className="text-readable">
                    Même lieu, dans les jardins<br/>
                    <span className="text-flashy-green font-semibold">21h00</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Transport */}
            <div className="card-elegant">
              <h2 className="title-secondary mb-4 text-flashy-green">🚗 Transport</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-decorative mb-2">En voiture</h3>
                  <p className="text-readable">
                    Parking gratuit disponible<br/>
                    Accès par l'A13 sortie Versailles
                  </p>
                </div>
                <div>
                  <h3 className="text-decorative mb-2">En transport</h3>
                  <p className="text-readable">
                    RER C - Station Versailles Château<br/>
                    15 minutes à pied du château
                  </p>
                </div>
              </div>
            </div>

            {/* Dress code */}
            <div className="card-elegant">
              <h2 className="title-secondary mb-4 text-flashy-pink">👗 Tenue souhaitée</h2>
              <div className="space-y-4">
                <p className="text-readable">
                  <strong>Style :</strong> Élégant et champêtre<br/>
                  <strong>Couleurs :</strong> Tons pastel bienvenus<br/>
                  <strong>À éviter :</strong> Blanc et noir<br/>
                  <strong>Chaussures :</strong> Évitez les talons hauts (jardin)
                </p>
              </div>
            </div>

            {/* Hébergement */}
            <div className="card-elegant">
              <h2 className="title-secondary mb-4 text-flashy-brown">🏨 Hébergement</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-decorative mb-2">Hôtels recommandés</h3>
                  <p className="text-readable">
                    • <strong>Hôtel de France</strong> - Centre-ville<br/>
                    • <strong>Mercure Versailles</strong> - Proche château<br/>
                    • <strong>Ibis Versailles</strong> - Budget
                  </p>
                </div>
                <p className="text-readable text-sm">
                  <em>Réservations conseillées avant le 1er juin</em>
                </p>
              </div>
            </div>

            {/* Météo et conseils */}
            <div className="card-elegant">
              <h2 className="title-secondary mb-4 text-flashy-purple">🌤️ Conseils pratiques</h2>
              <div className="space-y-4">
                <p className="text-readable">
                  • <strong>Météo juillet :</strong> 25°C en moyenne<br/>
                  • <strong>Prévoir :</strong> Petite veste pour le soir<br/>
                  • <strong>Cérémonie :</strong> En extérieur<br/>
                  • <strong>Plan B :</strong> Tente en cas de pluie
                </p>
              </div>
            </div>

            {/* Cadeaux */}
            <div className="card-elegant">
              <h2 className="title-secondary mb-4 text-flashy-green">🎁 Liste de mariage</h2>
              <div className="space-y-4">
                <p className="text-readable">
                  Votre présence est le plus beau des cadeaux !<br/>
                  Si vous souhaitez nous gâter :<br/>
                  <strong>• Urne</strong> sur place le jour J<br/>
                  <strong>• Liste</strong> disponible chez Galeries Lafayette
                </p>
              </div>
            </div>
          </div>

          {/* Contact urgence */}
          <div className="card-elegant mt-8 text-center bg-pastel-gold bg-opacity-50">
            <h2 className="title-secondary mb-4 text-flashy-brown">📞 Contact jour J</h2>
            <p className="text-readable">
              <strong>Marie :</strong> 06 12 34 56 78<br/>
              <strong>Thomas :</strong> 06 98 76 54 32<br/>
              <strong>Témoins :</strong> 06 11 22 33 44
            </p>
          </div>

          {/* Bouton RSVP */}
          <div className="text-center mt-8">
            <Link href="/rsvp" className="btn-elegant hover-lift">
              Confirmer ma présence
              <div className="text-sm mt-1 opacity-80">Avant le 30 août 2025</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}