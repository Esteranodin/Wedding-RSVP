"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, deleteDoc, doc, addDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
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
  const [stats, setStats] = useState({ attending: 0, notAttending: 0, totalGuests: 0, sleepingOnSite: 0, partyOnly: 0, ceremonyTotal: 0 });
  const [error, setError] = useState('');
  const [inviteList, setInviteList] = useState([]);
  const [activeTab, setActiveTab] = useState('responses');
  const [showImportModal, setShowImportModal] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  // Écoute l'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        fetchGuests();
        fetchInviteList();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchInviteList = async () => {
    try {
      const q = query(collection(db, 'inviteList'), orderBy('name'));
      const snapshot = await getDocs(q);
      
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setInviteList(list);
    } catch (error) {
      console.error("Erreur lors du chargement de la liste d'invités :", error);
    }
  };

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
      
      // Calcul des invités qui viennent seulement à la soirée
      const partyOnly = guestList.filter(g => 
        g.attending && 
        g.attendingEvents && 
        g.attendingEvents.includes('party') && 
        !g.attendingEvents.includes('ceremony')
      ).length;
      
      // Calcul du nombre total de personnes assistant à la cérémonie (invités + accompagnants)
      const ceremonyTotal = guestList.reduce((acc, guest) => {
        if (guest.attending && guest.attendingEvents && guest.attendingEvents.includes('ceremony')) {
          return acc + 1 + (guest.guestCount || 0);
        }
        return acc;
      }, 0);
      
      setStats({ attending, notAttending, totalGuests, sleepingOnSite, partyOnly, ceremonyTotal });
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
      setError("Erreur lors du chargement des données");
    }
  };

  const handleCsvImport = async (e) => {
    e.preventDefault();
    
    if (!csvFile) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        const rows = text.split('\n');
        const headers = rows[0].split(',');
        
        const nameIndex = headers.findIndex(h => h.trim().toLowerCase() === 'name');
        
        if (nameIndex === -1) {
          setError("Le fichier CSV doit contenir une colonne 'name'");
          return;
        }
        
        // Parcourir les lignes et créer les documents
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i].trim()) continue; // Ignorer les lignes vides
          
          const columns = rows[i].split(',');
          if (columns.length <= nameIndex) continue; // Ligne invalide
          
          const name = columns[nameIndex].trim();
          
          if (name) {
            await addDoc(collection(db, 'inviteList'), {
              name,
              hasResponded: false,
              dateAdded: serverTimestamp()
            });
          }
        }
        
        fetchInviteList();
        setShowImportModal(false);
        setCsvFile(null);
      } catch (error) {
        console.error("Erreur lors de l'import :", error);
        setError("Erreur lors de l'importation du fichier");
      }
    };
    
    reader.readAsText(csvFile);
  };

  const updateResponseStatus = async () => {
    try {
      // Créer un Map avec les noms des invités qui ont répondu
      const respondedNames = new Map();
      guests.forEach(guest => {
        respondedNames.set(guest.name.toLowerCase(), guest);
      });
      
      // Mettre à jour le statut de réponse pour chaque invité
      const batch = writeBatch(db);
      
      for (const invitee of inviteList) {
        const hasResponded = respondedNames.has(invitee.name.toLowerCase());
        const inviteeRef = doc(db, 'inviteList', invitee.id);
        
        batch.update(inviteeRef, { 
          hasResponded,
          responseDetails: hasResponded ? respondedNames.get(invitee.name.toLowerCase()) : null
        });
      }
      
      await batch.commit();
      fetchInviteList();
    } catch (error) {
      console.error("Erreur lors de la mise à jour des statuts :", error);
      setError("Erreur lors de la vérification des réponses");
    }
  };

  const deleteInvitee = async (inviteeId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet invité de la liste ?')) {
      try {
        await deleteDoc(doc(db, 'inviteList', inviteeId));
        fetchInviteList();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        setError("Erreur lors de la suppression de l'invité");
      }
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
      setInviteList([]);
      setStats({ attending: 0, notAttending: 0, totalGuests: 0, sleepingOnSite: 0, partyOnly: 0, ceremonyTotal: 0 });
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

          <h1 className="title">Espace admin ▼</h1>

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
              
              {/* Onglets de navigation */}
              <div className="mb-6">
                <div className="flex border-b border-gold">
                  <button 
                    className={`px-4 py-2 ${activeTab === 'responses' ? 'bg-sage bg-opacity-20 border-b-2 border-gold' : ''}`}
                    onClick={() => setActiveTab('responses')}
                  >
                    Réponses
                  </button>
                  <button 
                    className={`px-4 py-2 ${activeTab === 'inviteList' ? 'bg-sage bg-opacity-20 border-b-2 border-gold' : ''}`}
                    onClick={() => setActiveTab('inviteList')}
                  >
                    Liste complète
                  </button>
                </div>
              </div>
              
              {/* Stats rapides */}
              {activeTab === 'responses' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="card-elegant text-center p-4">
                    <div className="title-secondary text-dusty-rose mb-1">{stats.notAttending}</div>
                    <div className="text-sm font-medium">Invités ne viennent pas</div>
                  </div>
                  
                  <div className="card-elegant text-center p-4">
                    <div className="title-secondary text-deep-emerald mb-1">{stats.ceremonyTotal}</div>
                    <div className="text-sm font-medium">Personnes à la cérémonie</div>
                  </div>
                  
                  <div className="card-elegant text-center p-4">
                    <div className="title-secondary text-deep-emerald mb-1">{stats.sleepingOnSite || 0}</div>
                    <div className="text-sm font-medium">Dorment sur place</div>
                  </div>
                  
                  <div className="card-elegant text-center p-4">
                    <div className="title-secondary text-gold mb-1">{stats.totalGuests}</div>
                    <div className="text-sm font-medium">Total invités</div>
                  </div>
                </div>
              )}
              
              {/* Stats de la liste d'invités */}
              {activeTab === 'inviteList' && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="card-elegant text-center p-4">
                    <div className="title-secondary text-deep-emerald mb-1">
                      {inviteList.filter(i => i.hasResponded).length}
                    </div>
                    <div className="text-sm font-medium">Ont répondu</div>
                  </div>
                  
                  <div className="card-elegant text-center p-4">
                    <div className="title-secondary text-dusty-rose mb-1">
                      {inviteList.filter(i => !i.hasResponded).length}
                    </div>
                    <div className="text-sm font-medium">En attente</div>
                  </div>
                  
                  <div className="card-elegant text-center p-4">
                    <div className="title-secondary text-gold mb-1">
                      {Math.round(inviteList.length > 0 
                        ? (inviteList.filter(i => i.hasResponded).length / inviteList.length) * 100 
                        : 0)}%
                    </div>
                    <div className="text-sm font-medium">Taux de réponse</div>
                  </div>
                </div>
              )}
              
              {/* Liste simplifiée */}
              {activeTab === 'responses' && (
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
                              <div className={`text-2xl ${guest.attending ? 'text-green-500' : 'text-red-500'}`}>
                                {guest.attending ? '✓' : '✗'}
                              </div>
                              <div>
                                <div className="font-semibold">{guest.name}</div>
                                {/* {guest.lastname && guest.firstname && (
                                  <div className="text-sm text-gray-600">{guest.firstname} {guest.lastname}</div>
                                )} */}
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
                              <div className="font-semibold text-xl">+ {guest.guestCount || 0}</div>
                            </div>
                            
                            <div className="text-center p-2 bg-white bg-opacity-50 rounded">
                              <div className="font-semibold">
                                <div className="text-xs text-gray-600">vient à </div>
                                {guest.attendingEvents ? 
                                  (guest.attendingEvents.includes('ceremony') && guest.attendingEvents.includes('party') ? 'Cérémonie + Soirée' :
                                   guest.attendingEvents.includes('ceremony') ? 'Cérémonie seule' :
                                   guest.attendingEvents.includes('party') ? 'Soirée seule' : 'Non défini')
                                  : 'Non défini'
                                }
                              </div>
                            </div>
                            
                            <div className="text-center p-2 bg-white bg-opacity-50 rounded">
                              <div className="text-xs text-gray-600">DODO</div>
                              <div className="font-semibold">
                                {guest.sleeping ? '😴 Oui' : '🏠 Non'}
                              </div>
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
              )}
              
              {/* Liste des invités */}
              {activeTab === 'inviteList' && (
                <div className="card-elegant">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="title-secondary">📋 Liste des invités ({inviteList.length})</h2>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowImportModal(true)}
                        className="px-3 py-1 bg-sage bg-opacity-20 hover:bg-opacity-30 rounded text-sm"
                      >
                        Importer CSV
                      </button>
                      <button 
                        onClick={updateResponseStatus}
                        className="px-3 py-1 bg-deep-emerald bg-opacity-20 hover:bg-opacity-30 rounded text-sm"
                      >
                        Vérifier réponses
                      </button>
                    </div>
                  </div>
                  
                  {inviteList.length === 0 ? (
                    <p className="text-center py-8">Aucun invité dans la liste</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-sage bg-opacity-10">
                          <tr>
                            <th className="p-2 text-left">Nom</th>
                            <th className="p-2 text-center">Statut</th>
                            <th className="p-2 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inviteList.map(invitee => (
                            <tr key={invitee.id} className="border-b border-gold border-opacity-20">
                              <td className="p-2">{invitee.name}</td>
                              <td className="p-2 text-center">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                  invitee.hasResponded 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {invitee.hasResponded ? 'A répondu' : 'En attente'}
                                </span>
                              </td>
                              <td className="p-2 text-center">
                                <button
                                  onClick={() => deleteInvitee(invitee.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  🗑️
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              
              {/* Modal d'import CSV */}
              {showImportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-8 max-w-md w-full border-2 border-gold shadow-xl">
                    <h3 className="title-secondary text-xl mb-4 text-center">Importer des invités</h3>
                    <div className="card-elegant mb-6 p-4 bg-sage bg-opacity-10">
                      <p className="text-sm">
                        <strong>Format requis :</strong> Votre fichier CSV doit contenir une colonne "name" avec le nom complet de chaque invité.
                      </p>
                      <p className="text-sm mt-2 text-gray-600">
                        Exemple : <code>name,email,groupe<br/>Jean Dupont,jean@example.com,Famille</code>
                      </p>
                    </div>
                    <form onSubmit={handleCsvImport}>
                      <div className="mb-6">
                        <label className="block mb-2 font-medium">Fichier CSV :</label>
                        <input 
                          type="file" 
                          accept=".csv" 
                          onChange={(e) => setCsvFile(e.target.files[0])}
                          className="w-full h-full border border-gold p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-deep-emerald"
                        />
                      </div>
                      <div className="flex justify-between gap-4">
                        <button 
                          type="button"
                          onClick={() => setShowImportModal(false)}
                          className="px-6 py-2 border-2 border-gold rounded-md hover:bg-sage hover:bg-opacity-10 transition-colors"
                        >
                          Annuler
                        </button>
                        <button 
                          type="submit"
                          className="btn-elegant hover-lift px-6 py-2"
                        >
                          Importer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}