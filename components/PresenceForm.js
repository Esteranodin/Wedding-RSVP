"use client";

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function RSVPForm() {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [attending, setAttending] = useState(null);
  const [sleeping, setSleeping] = useState(null);
  const [guests, setGuests] = useState('');
  const [dietary, setDietary] = useState('');
  const [infos, setInfos] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [error, setError] = useState('');

  const isPartySelected = attendingEvents.includes('party');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!lastname.trim()) {
      setError('Le nom est requis.');
      return;
    }
    if (!firstname.trim()) {
      setError('Le prénom est requis.');
      return;
    }
    if (attending === null) {
      setError('Merci d\'indiquer si vous venez.');
      return;
    }
    if (attending && attendingEvents.length === 0) {
      setError("Merci de sélectionner au moins 'Cérémonie' ou 'Soirée'.");
      return;
    }
    if (attending && guests === '') {
      setError('Merci d\'indiquer le nombre de personnes.');
      return;
    }
    if (attending && (isNaN(parseInt(guests)) || parseInt(guests) < 0)) {
      setError('Le nombre d\'accompagnants est invalide.');
      return;
    }
    if (attending && isPartySelected && sleeping === null) {
      setError('Merci d\'indiquer si vous dormez sur place.');
      return;
    }

    try {
      await addDoc(collection(db, 'guests'), {
        lastname,
        firstname,
        name: `${firstname} ${lastname}`,
        attending,
        attendingEvents,
        sleeping,
        guestCount: Number(guests),
        dietary,
        infos,
        timestamp: new Date()
      });

      setSubmitted(true);
    } catch (error) {
      setError("Erreur lors de l'envoi du formulaire. Veuillez réessayer.");
      console.error("Error adding document: ", error);
    }
  };

  if (submitted) {
    return (
      <div className="card-elegant">
        <h2 className="title-secondary mb-6 text-deep-emerald">Merci pour votre réponse&nbsp;!</h2>
        <p className="text-readable text-center mb-4">
          Nous avons bien reçu votre confirmation.<br />
          À très bientôt pour faire la fête ! 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">

      <h2 className="title-secondary mb-8 text-center"> - En remplissant tous les champs de ce formulaire, merci ♥ -</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1">
            <label htmlFor="lastname" className="block">Nom</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={e => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="firstname" className="block">Prénom</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block">Est-ce que tu viens ? (coche la bonne réponse)</label>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="attending"
                checked={attending === true}
                onChange={() => setAttending(true)}
                className="sr-only"
              />
              <div className={`w-6 h-6 border-2 rounded-full ${attending === true ? 'bg-[#9CAF88] border-[#2D5A3D]' : 'border-[#2D5A3D]'}`}>
              </div>
              <span className="text-readable">Je serai 🥳 présent(e)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="attending"
                checked={attending === false}
                onChange={() => {
                  setAttending(false);
                  setAttendingEvents([]);
                }}
                className="sr-only"
              />
              <div className={`w-6 h-6 border-2 rounded-full ${attending === false ? 'bg-[#9CAF88] border-[#2D5A3D]' : 'border-[#2D5A3D]'}`}>
              </div>
              <span className="text-readable">Je ne pourrai pas venir</span>
            </label>
          </div>
        </div>

        {/* Questions supplémentaires seulement si la personne vient */}
        {attending && (
          <div className="mb-6">
            <div className="mb-6">
              <label className="block mb-3">Tu peux venir : (coche une ou deux cases)</label>
                <label className="flex items-center space-x-2 sm:space-x-3 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={attendingEvents.includes('ceremony')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAttendingEvents([...attendingEvents, 'ceremony']);
                      } else {
                        setAttendingEvents(attendingEvents.filter(event => event !== 'ceremony'));
                      }
                    }}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 border-2 rounded ${attendingEvents.includes('ceremony') ? 'bg-[#9CAF88] border-[#2D5A3D]' : 'border-[#2D5A3D]'}`}>
                  </div>
                  <span className="text-readable">à la cérémonie (heure)</span>
                </label>
                <label className="flex items-center space-x-2 sm:space-x-3 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={attendingEvents.includes('party')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAttendingEvents([...attendingEvents, 'party']);
                      } else {
                        setAttendingEvents(attendingEvents.filter(event => event !== 'party'));
                      }
                    }}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 border-2 rounded ${attendingEvents.includes('party') ? 'bg-[#9CAF88] border-[#2D5A3D]' : 'border-[#2D5A3D]'}`}>
                  </div>
                  <span className="text-readable">à la soirée (heure)</span>
                </label>
            </div>

            {/* Question sur l'hébergement uniquement si la personne vient à la soirée */}
            {isPartySelected && (
              <div className="mb-6">
                <label className="block mb-3">Dormez-vous sur place ?</label>
                  <label className="flex items-center space-x-2 sm:space-x-3 cursor-pointer mb-2">
                      <input
                        type="radio"
                        name="sleeping"
                        checked={sleeping === true}
                        onChange={() => setSleeping(true)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 border-2 rounded-full ${sleeping === true ? 'bg-[#9CAF88] border-[#2D5A3D]' : 'border-[#2D5A3D]'}`}></div>
                    <span className="text-readable">Oui, je dors sur place 🛏️</span>
                  </label>
                  <label className="flex items-center space-x-2 sm:space-x-3 cursor-pointer mb-2">
                      <input
                        type="radio"
                        name="sleeping"
                        checked={sleeping === false}
                        onChange={() => setSleeping(false)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 border-2 rounded-full ${sleeping === false ? 'bg-[#9CAF88] border-[#2D5A3D]' : 'border-[#2D5A3D]'}`}></div>
                    <span className="text-readable">Non, je fais dodo ailleurs</span>
                  </label>
              </div>
            )}

            <div className="mb-6">
              <label className="block mb-3">Qui vient avec toi ?</label>
              <div className="flex flex-col items-start space-y-5">
                <label className="flex items-center space-x-4 sm:space-x-5 cursor-pointer p-2 w-full hover:bg-sage hover:bg-opacity-5 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="guests"
                    checked={guests === '0'}
                    onChange={() => setGuests('0')}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 border-2 rounded ${guests === '0' ? 'bg-[#9CAF88] border-[#2D5A3D]' : 'border-[#2D5A3D]'}`}></div>
                  <span className="text-readable">Je viens <strong>seul(e)</strong></span>
                </label>
                
                <label className="flex items-center space-x-4 sm:space-x-5 cursor-pointer p-2 w-full hover:bg-sage hover:bg-opacity-5 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="guests"
                    checked={guests === '1'}
                    onChange={() => setGuests('1')}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 border-2 rounded ${guests === '1' ? 'bg-[#9CAF88] border-[#2D5A3D]' : 'border-[#2D5A3D]'}`}></div>
                  <span className="text-readable">Je viens avec <strong>1 personne</strong></span>
                </label>
                
                <label className="flex items-center space-x-4 sm:space-x-5 cursor-pointer p-2 w-full hover:bg-sage hover:bg-opacity-5 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="guests"
                    checked={guests === '2'}
                    onChange={() => setGuests('2')}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 border-2 rounded ${guests === '2' ? 'bg-[#9CAF88] border-[#2D5A3D]' : 'border-[#2D5A3D]'}`}></div>
                  <span className="text-readable">Je viens avec <strong>2 personnes</strong> (dont 1 enfant)</span>
                </label>
                
                <label className="flex items-center space-x-4 sm:space-x-5 cursor-pointer p-2 w-full hover:bg-sage hover:bg-opacity-5 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="guests"
                    checked={guests === '3'}
                    onChange={() => setGuests('3')}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 border-2 rounded ${guests === '3' ? 'bg-[#9CAF88] border-[#2D5A3D]' : 'border-[#2D5A3D]'}`}></div>
                  <span className="text-readable">Je viens avec <strong>3 personnes</strong> (dont 2 enfants)</span>
                </label>
                
                <label className="flex items-center space-x-4 sm:space-x-5 cursor-pointer p-2 w-full hover:bg-sage hover:bg-opacity-5 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="guests"
                    checked={guests === '4'}
                    onChange={() => setGuests('4')}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 border-2 rounded ${guests === '4' ? 'bg-[#9CAF88] border-[#2D5A3D]' : 'border-[#2D5A3D]'}`}></div>
                  <span className="text-readable">Je viens avec <strong>4 personnes</strong> (dont 3 enfants)</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="dietary" className="block mb-2">Allergies alimentaires</label>
              <textarea
                id="dietary"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                placeholder="Précises ici si tu as des ALLERGIES, on fera passer le mot au traiteur !"
                rows="4"
                className="w-full border-gold focus:ring-deep-emerald focus:border-deep-emerald min-h-[100px]"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="infos" className="block mb-2">Infos en plus ? </label>
              <textarea
                id="infos"
                value={infos}
                onChange={(e) => setInfos(e.target.value)}
                placeholder="Si tu veux nous laisser un petit mot, une précision ou autre, c'est ici !"
                rows="4"
                className="w-full border-gold focus:ring-deep-emerald focus:border-deep-emerald min-h-[100px]"
              />
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4 text-center animate-fadeIn">
            {error}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button type="submit" className="btn-elegant">
            Envoyer ma réponse
          </button>
        </div>
      </form>
    </div>
  );
}