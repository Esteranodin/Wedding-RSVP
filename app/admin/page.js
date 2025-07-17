"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Admin() {
  const [guests, setGuests] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const [stats, setStats] = useState({ attending: 0, notAttending: 0, total: 0 });

  useEffect(() => {
    if (user) {
      fetchGuests();
    }
  }, [user]);

  const fetchGuests = async () => {
    const q = query(collection(db, 'guests'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    
    const guestList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    setGuests(guestList);
    
    // Calculate stats
    const attending = guestList.filter(g => g.attending).length;
    const notAttending = guestList.filter(g => !g.attending).length;
    
    setStats({
      attending,
      notAttending,
      total: guestList.length
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in: ", error);
      alert("Erreur de connexion: " + error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <h1 className="title">Administration</h1>
      
      {!user ? (
        <div className="admin-login">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit">Se connecter</button>
          </form>
        </div>
      ) : (
        <div className="admin-dashboard">
          <div className="admin-header">
            <button onClick={handleLogout} className="logout-btn">Se déconnecter</button>
          </div>
          
          <div className="stats-container">
            <div className="stat-box">
              <h3>Présents</h3>
              <p>{stats.attending}</p>
            </div>
            <div className="stat-box">
              <h3>Absents</h3>
              <p>{stats.notAttending}</p>
            </div>
            <div className="stat-box">
              <h3>Total</h3>
              <p>{stats.total}</p>
            </div>
          </div>
          
          <h2>Liste des réponses</h2>
          
          <table className="guest-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Présence</th>
                <th>Accompagnants</th>
                <th>Régime alimentaire</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {guests.map(guest => (
                <tr key={guest.id}>
                  <td>{guest.name}</td>
                  <td>{guest.email}</td>
                  <td>{guest.attending ? '✅' : '❌'}</td>
                  <td>{guest.guestCount}</td>
                  <td>{guest.dietary || '-'}</td>
                  <td>{guest.timestamp?.toDate().toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}