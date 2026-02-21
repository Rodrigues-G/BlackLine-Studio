// assets/js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// A TUA CONFIG (copia exatamente do Firebase Console > Project Settings > SDK setup)
const firebaseConfig = {
  apiKey: "AIzaSyDwUD2aQ1vi4hSOmtHKJk3f7ja3A1Q_9PI",
  authDomain: "tatu-shop.firebaseapp.com",
  projectId: "tatu-shop",
  storageBucket: "tatu-shop.firebasestorage.app",
  messagingSenderId: "1008153357554",
  appId: "1:1008153357554:web:470bda1ded3c71b5fdb46b",
  measurementId: "G-PLHL0L10BS"
};

// Inicializa UMA VEZ
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta TUDO o que precisas (obrigatório!)
export {
  app,
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,     // ← esta faltava ou estava mal exportada
  onAuthStateChanged,
  signOut,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
};

console.log("firebase.js carregado com sucesso");  // ajuda a depurar
