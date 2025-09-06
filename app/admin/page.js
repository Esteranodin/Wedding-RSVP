"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import styles from '../no-animations.module.css';

export default function Admin() {
  const [guests, setGuests] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ attending: 0, notAttending: 0, totalGuests: 0, sleepingOnSite: 0 });
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
      const sleepingOnSite = guestList.reduce((acc, guest) => {
        return (guest.attending && guest.sleeping) ? acc + 1 + (guest.guestCount || 0) : acc;
      }, 0);
      
      setStats({ attending, notAttending, totalGuests, sleepingOnSite });
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
      <div className={`page-bg ${styles.noAnimations}`}>
        <section className="content-wrapper">
          <div className="form-elegant">
            <div className="text-center">
              <div className="text-decorative">Chargement...</div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={`page-bg ${styles.noAnimations}`}>
      <section className="content-wrapper">
        <div className="form-elegant">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="text-link">
              ←&nbsp;Accueil
            </Link>
            
            {user && (
              <button onClick={handleLogout} className="text-link">
                Déconnexion
              </button>
            )}
          </div>

          <h1 className="title">Vus d'ensemble ▼</h1>

          {!user ? (
            // Formulaire de connexion
            <div className="card-elegant">
              {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="w-full border-gold focus:ring-deep-emerald focus:border-deep-emerald"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block mb-2 font-medium">Mot de passe</label>
                  <input 
                    type="password" 
                    id="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="w-full border-gold focus:ring-deep-emerald focus:border-deep-emerald"
                  />
                </div>
                
                <div className="text-center">
                  <button type="submit" className="btn-elegant hover-lift">
                    Se connecter
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Dashboard admin
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
                  {error}
                </div>
              )}
              
              {/* Stats rapides */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="card-elegant text-center p-4">
                  <div className="title-secondary text-deep-emerald mb-1">{stats.attending}</div>
                  <div className="text-sm font-medium">Invités ont répondu</div>
                </div>
                
                <div className="card-elegant text-center p-4">
                  <div className="title-secondary text-dusty-rose mb-1">{stats.notAttending}</div>
                  <div className="text-sm font-medium">Invités ne viennent pas</div>
                </div>
                
                <div className="card-elegant text-center p-4">
                  <div className="title-secondary text-gold mb-1">{stats.totalGuests}</div>
                  <div className="text-sm font-medium">Total invités</div>
                </div>
                
                <div className="card-elegant text-center p-4">
                  <div className="title-secondary text-deep-emerald mb-1">{stats.sleepingOnSite || 0}</div>
                  <div className="text-sm font-medium">Dorment sur place</div>
                </div>
              </div>
              
              {/* Liste simplifiée */}
              <div className="card-elegant">
                <h2 className="title-secondary mb-6">📝 Réponses ({guests.length})</h2>
                
                {guests.length === 0 ? (
                  <p className="text-center py-8 text-sm font-medium">Aucune réponse pour le moment</p>
                ) : (
                  <div className="space-y-4">
                    {guests.map(guest => (
                      <div key={guest.id} className="p-4 bg-sage bg-opacity-10 rounded-lg border border-gold">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`text-2xl ${guest.attending ? 'text-deep-emerald' : 'text-dusty-rose'}`}>
                              {guest.attending ? '✓' : '✗'}
                            </div>
                            <div>
                              <div className="font-semibold">{guest.name}</div>
                              {guest.lastname && guest.firstname && (
                                <div className="text-sm text-gray-600">{guest.firstname} {guest.lastname}</div>
                              )}
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => deleteGuest(guest.id)}
                            className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded-full hover:bg-red-50 transition-colors"
                            title="Supprimer"
                          >
                            🗑️
                          </button>
                        </div>
                        
                        {guest.attending && (
                          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="text-center p-2 bg-white bg-opacity-50 rounded">
                              <div className="font-semibold">+{guest.guestCount || 0}</div>
                              <div className="text-xs text-gray-600">accompagnants</div>
                            </div>
                            
                            <div className="text-center p-2 bg-white bg-opacity-50 rounded">
                              <div className="font-semibold">
                                {guest.attendingEvents ? 
                                  (guest.attendingEvents.includes('ceremony') && guest.attendingEvents.includes('party') ? 'Cérémonie + Soirée' :
                                   guest.attendingEvents.includes('ceremony') ? 'Cérémonie seule' :
                                   guest.attendingEvents.includes('party') ? 'Soirée seule' : 'Non défini')
                                  : 'Non défini'
                                }
                              </div>
                              <div className="text-xs text-gray-600">participation</div>
                            </div>
                            
                            <div className="text-center p-2 bg-white bg-opacity-50 rounded">
                              <div className="font-semibold">
                                {guest.sleeping ? '😴 Oui' : '🏠 Non'}
                              </div>
                              <div className="text-xs text-gray-600">dort sur place</div>
                            </div>
                            
                            <div className="text-center p-2 bg-white bg-opacity-50 rounded">
                              <div className="text-sm">
                                {guest.timestamp?.toDate().toLocaleDateString('fr-FR')}
                              </div>
                              <div className="text-xs text-gray-600">date réponse</div>
                            </div>
                          </div>
                        )}
                        
                        {guest.dietary && (
                          <div className="mt-3 p-3 bg-white bg-opacity-50 rounded">
                            <div className="text-xs font-medium mb-1">Régimes alimentaires :</div>
                            <div className="text-sm">{guest.dietary}</div>
                          </div>
                        )}
                        {guest.infos && (
                          <div className="mt-3 p-3 bg-white bg-opacity-50 rounded">
                            <div className="text-xs font-medium mb-1">Infos en plus :</div>
                            <div className="text-sm">{guest.infos}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}