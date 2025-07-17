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
      <div className="success-message">
        <h2>Merci pour votre réponse !</h2>
        <p>Nous avons bien reçu votre confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rsvp-form">
      <h2>Confirmez votre présence</h2>
      
      <div className="form-group">
        <label htmlFor="name">Nom et prénom</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Participation</label>
        <div className="radio-group">
          <label>
            <input 
              type="radio" 
              checked={attending} 
              onChange={() => setAttending(true)} 
            />
            Je serai présent(e)
          </label>
          <label>
            <input 
              type="radio" 
              checked={!attending} 
              onChange={() => setAttending(false)} 
            />
            Je ne pourrai pas venir
          </label>
        </div>
      </div>
      
      {attending && (
        <>
          <div className="form-group">
            <label htmlFor="guests">Nombre d'accompagnants</label>
            <select 
              id="guests" 
              value={guests} 
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="dietary">Régimes alimentaires particuliers</label>
            <textarea 
              id="dietary" 
              value={dietary} 
              onChange={(e) => setDietary(e.target.value)}
              placeholder="Allergies, préférences..."
            />
          </div>
        </>
      )}
      
      <button type="submit" className="submit-btn">
        Envoyer ma réponse
      </button>
    </form>
  );
}