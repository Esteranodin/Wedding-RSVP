import Link from 'next/link';

export const metadata = {
  title: 'Mariage ♥ Infos pratiques',
  description: 'Toutes les informations pratiques pour notre mariage',
}

export default function Infos() {
  return (
    <div className="page-bg mt-header">
      <section className="content-wrapper">
        <div className="form-elegant w-full max-w-4xl">
          <Link href="/" className="text-link inline-block">
            ←&nbsp;Accueil
          </Link>

          <h1 className="title text-center mb-8">Les infos ▼</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-elegant mt-10">
              <h2 className="title-secondary mb-4 text-flashy-purple">📍 Lieu et horaires</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-decorative mb-2">Célébration</h3>
                  <p className="text-readable">
                    <strong>Jardin de l'abbaye de Pébrac</strong><br />
                    Le Bourg, 43300 Pébrac<br />
                  </p>
                  <p className="text-strong">
                  14h30</p>
                  <p className="text-readable">
                   - Essayez d'être là 15-20 minutes avant -
                  </p>
                </div>
                <div>
                  <h3 className="text-decorative mb-2">Soirée</h3>
                  <p className="text-readable">
                    <strong>Gîte du Pradel</strong><br />
                    Le Pradel, 43300 Saint-Julien-des-Chazes<br />
                  </p>
                  <p className="text-strong">
                  18h00</p>
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
                    Parking gratuit disponible<br />
                    Accès par l'A13 sortie Versailles
                  </p>
                </div>
                <div>
                  <h3 className="text-decorative mb-2">En transport</h3>
                  <p className="text-readable">
                    RER C - Station Versailles Château<br />
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
                  <strong>Style :</strong> Élégant et champêtre<br />
                  <strong>Couleurs :</strong> Tons pastel bienvenus<br />
                  <strong>À éviter :</strong> Blanc et noir<br />
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
                    • <strong>Hôtel de France</strong> - Centre-ville<br />
                    • <strong>Mercure Versailles</strong> - Proche château<br />
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
                  • <strong>Météo juillet :</strong> 25°C en moyenne<br />
                  • <strong>Prévoir :</strong> Petite veste pour le soir<br />
                  • <strong>Cérémonie :</strong> En extérieur<br />
                  • <strong>Plan B :</strong> Tente en cas de pluie
                </p>
              </div>
            </div>

            {/* Cadeaux */}
            <div className="card-elegant">
              <h2 className="title-secondary mb-4 text-flashy-green">🎁 Liste de mariage</h2>
              <div className="space-y-4">
                <p className="text-readable">
                  Votre présence est le plus beau des cadeaux !<br />
                  Si vous souhaitez nous gâter :<br />
                  <strong>• Urne</strong> sur place le jour J<br />
                  <strong>• Liste</strong> disponible chez Galeries Lafayette
                </p>
              </div>
            </div>
          </div>

          {/* Contact urgence */}
          <div className="card-elegant mt-8 text-center bg-pastel-gold bg-opacity-50">
            <h2 className="title-secondary mb-4 text-flashy-brown">📞 Contact jour J</h2>
            <p className="text-readable">
              <strong>Marie :</strong> 06 12 34 56 78<br />
              <strong>Thomas :</strong> 06 98 76 54 32<br />
              <strong>Témoins :</strong> 06 11 22 33 44
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
      </section>
    </div>
  );
}