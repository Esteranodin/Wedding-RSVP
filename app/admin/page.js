"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';

export default function Admin() {
  const [guests, setGuests] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ attending: 0, notAttending: 0, totalGuests: 0 });
  const [error, setError] = useState('');

  // Écoute l'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        fetchGuests();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchGuests = async () => {
    try {
      const q = query(collection(db, 'guests'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      
      const guestList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setGuests(guestList);
      
      // Calcul des stats
      const attending = guestList.filter(g => g.attending).length;
      const notAttending = guestList.filter(g => !g.attending).length;
      const totalGuests = guestList.reduce((acc, guest) => {
        return guest.attending ? acc + 1 + (guest.guestCount || 0) : acc;
      }, 0);
      
      setStats({ attending, notAttending, totalGuests });
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
      setError("Erreur lors du chargement des données");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError('Identifiants incorrects');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setGuests([]);
      setStats({ attending: 0, notAttending: 0, totalGuests: 0 });
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  const deleteGuest = async (guestId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réponse ?')) {
      try {
        await deleteDoc(doc(db, 'guests', guestId));
        fetchGuests(); // Recharger les données
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        setError("Erreur lors de la suppression");
      }
    }
  };

  if (loading) {
    return (
      <div className="page-bg">
        <div className="content-wrapper">
          <div className="text-center">
            <div className="text-decorative">Chargement...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg mt-header">
      <div className="content-wrapper">
        <div className="form-elegant w-full max-w-6xl">
          <Link href="/" className="inline-block mb-6 text-decorative hover:opacity-70 transition-opacity">
            ← Retour à l'accueil
          </Link>
          
          <h1 className="title-main text-center mb-8">Administration</h1>
          
          {!user ? (
            // Formulaire de connexion
            <div className="card-elegant max-w-md mx-auto">
              {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-6">
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
                  <label htmlFor="password">Mot de passe</label>
                  <input 
                    type="password" 
                    id="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                
                <button type="submit" className="btn-elegant w-full">
                  Se connecter
                </button>
              </form>
            </div>
          ) : (
            // Dashboard admin
            <div className="space-y-8">
              <div className="flex justify-end">
                <button onClick={handleLogout} className="btn-elegant">
                  Déconnexion
                </button>
              </div>

              {error && (
                <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded">
                  {error}
                </div>
              )}
              
              {/* Stats rapides */}
              <div className="grid grid-cols-3 gap-6">
                <div className="card-elegant text-center">
                  <div className="title-secondary text-deep-emerald">{stats.attending}</div>
                  <div className="text-decorative">Confirmés</div>
                </div>
                
                <div className="card-elegant text-center">
                  <div className="title-secondary text-dusty-rose">{stats.notAttending}</div>
                  <div className="text-decorative">Absents</div>
                </div>
                
                <div className="card-elegant text-center">
                  <div className="title-secondary text-gold">{stats.totalGuests}</div>
                  <div className="text-decorative">Total invités</div>
                </div>
              </div>
              
              {/* Liste simplifiée */}
              <div className="card-elegant">
                <h2 className="title-secondary mb-6">Réponses ({guests.length})</h2>
                
                {guests.length === 0 ? (
                  <p className="text-center text-decorative py-8">Aucune réponse pour le moment</p>
                ) : (
                  <div className="space-y-4">
                    {guests.map(guest => (
                      <div key={guest.id} className="flex justify-between items-center p-4 bg-pearl bg-opacity-50 rounded border">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div className={`text-2xl ${guest.attending ? 'text-deep-emerald' : 'text-dusty-rose'}`}>
                              {guest.attending ? '✓' : '✗'}
                            </div>
                            <div>
                              <div className="font-semibold text-readable">{guest.name}</div>
                              <div className="text-sm text-decorative">{guest.email}</div>
                            </div>
                          </div>
                        </div>
                        
                        {guest.attending && (
                          <div className="text-center mx-4">
                            <div className="font-semibold text-readable">+{guest.guestCount || 0}</div>
                            <div className="text-xs text-decorative">accomp.</div>
                          </div>
                        )}
                        
                        {guest.dietary && (
                          <div className="text-center mx-4 max-w-xs">
                            <div className="text-sm text-readable truncate">{guest.dietary}</div>
                            <div className="text-xs text-decorative">régime</div>
                          </div>
                        )}
                        
                        <div className="text-center mx-4">
                          <div className="text-sm text-readable">
                            {guest.timestamp?.toDate().toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => deleteGuest(guest.id)}
                          className="text-red-600 hover:text-red-800 text-sm px-2 py-1"
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}