"use client";

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function RSVPForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(0);
  const [dietary, setDietary] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, 'guests'), {
        name,
        email,
        attending,
        guestCount: Number(guests),
        dietary,
        timestamp: new Date()
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (submitted) {
    return (
      <div className="card-elegant text-center">
        <h2 className="title-secondary  mb-4">Merci pour votre réponse !</h2>
        <div className="separator-art-deco"></div>
        <p className="text-readable">
          Nous avons bien reçu votre confirmation.<br/>
          À très bientôt pour faire la fête ! 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="title-secondary text-center">Confirmez votre présence</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name">Nom et prénom</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        
        <div>
          <label className="mb-4 block">Participation</label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="radio" 
                name="attending"
                checked={attending} 
                onChange={() => setAttending(true)}
                className="w-5 h-5 "
              />
              <span className="text-readable">Je serai présent(e) 🎉</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="radio" 
                name="attending"
                checked={!attending} 
                onChange={() => setAttending(false)}
                className="w-5 h-5 text-flashy-pink"
              />
              <span className="text-readable">Je ne pourrai pas venir 😢</span>
            </label>
          </div>
        </div>
        
        {attending && (
          <>
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
              <label htmlFor="dietary">Régimes alimentaires particuliers</label>
              <textarea 
                id="dietary" 
                value={dietary} 
                onChange={(e) => setDietary(e.target.value)}
                placeholder="Allergies, végétarien, végan, sans gluten..."
                rows="3"
              />
            </div>
          </>
        )}
        
        <button type="submit" className="btn-elegant w-full hover-lift">
          Envoyer ma réponse
        </button>
      </form>
    </div>
  );
}