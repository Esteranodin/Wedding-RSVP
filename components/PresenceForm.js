"use client";

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function RSVPForm() {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [attending, setAttending] = useState(true);
  const [sleeping, setSleeping] = useState(true);
  const [guests, setGuests] = useState(0);
  const [dietary, setDietary] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [attendingEvents, setAttendingEvents] = useState(['ceremony', 'party']);
  const [error, setError] = useState('');

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
    if (attending && attendingEvents.length === 0) {
      setError("Merci de sélectionner au moins 'Cérémonie' ou 'Soirée'.");
      return;
    }
    if (attending && (isNaN(guests) || guests < 0)) {
      setError('Le nombre d\'accompagnants est invalide.');
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
      <div className="card-elegant text-center">
        <h2 className="title-secondary mb-4">Merci pour votre réponse !</h2>
        <p className="text-readable">
          Nous avons bien reçu votre confirmation.<br/>
          À très bientôt pour faire la fête ! 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
          {error}
        </div>
      )}

      <h2 className="title-secondary mb-12"> - En remplissant tous les champs de ce formulaire, merci ♥ -</h2>

      <form onSubmit={handleSubmit} className="space-y-8 center-item">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div className="flex-1">
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={e => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="mb-4 block">Est-ce que tu viens ?</label>
          <div className="space-y-3 flex flex-wrap gap-6">
            <label className="items-center space-x-0 cursor-pointer">
              <input 
                type="radio" 
                name="attending"
                checked={attending} 
                onChange={() => setAttending(true)}
              />
              <span className="text-readable">Je serai présent(e) 🥳</span>
            </label>
            <label>
              <input 
                type="radio" 
                name="attending"
                checked={!attending} 
                onChange={() => setAttending(false)}
              />
              <span className="text-readable">Je ne pourrai pas venir 😭</span>
            </label>
          </div>
        </div>
        
        {attending && (
          <>
            <div>
              <label className="mb-4 block">Tu viens à :</label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
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
                    className="w-5 h-5"
                  />
                  <span className="text-readable">Cérémonie (14h30)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
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
                    className="w-5 h-5"
                  />
                  <span className="text-readable">Soirée (18h00)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="mb-4 block">Dormez-vous sur place au gîte ?</label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="sleeping"
                    checked={sleeping} 
                    onChange={() => setSleeping(true)}
                    className="w-5 h-5"
                  />
                  <span className="text-readable">Oui, je dors sur place 😴</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="sleeping"
                    checked={!sleeping} 
                    onChange={() => setSleeping(false)}
                    className="w-5 h-5"
                  />
                  <span className="text-readable">Non, je rentre chez moi 🏠</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="guests">Nombre d'accompagnants</label>
              <select 
                id="guests" 
                value={guests} 
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="0">0 - Je viens seul(e)</option>
                <option value="1">1 accompagnant</option>
                <option value="2">2 accompagnants</option>
                <option value="3">3 accompagnants</option>
                <option value="4">4 accompagnants</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dietary">Allergies alimentaires</label>
              <textarea 
                id="dietary" 
                value={dietary} 
                onChange={(e) => setDietary(e.target.value)}
                placeholder="Précisez ici si vous avez des allergies ou des régimes alimentaires particuliers"
                rows="3"
              />
            </div>
          </>
        )}
          <button type="submit" className="btn-elegant">
            Envoyer ma réponse
          </button>
      </form>
    </div>
  );
}