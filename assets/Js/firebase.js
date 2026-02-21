// assets/js/firebase.js – versão expandida (opcional)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

// Opcional: App Check (anti-abuso) – ativa no console primeiro
// import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app-check.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwUD2aQ1vi4hSOmtHKJk3f7ja3A1Q_9PI",
  authDomain: "tatu-shop.firebaseapp.com",
  projectId: "tatu-shop",
  storageBucket: "tatu-shop.firebasestorage.app",
  messagingSenderId: "1008153357554",
  appId: "1:1008153357554:web:470bda1ded3c71b5fdb46b",
  measurementId: "G-PLHL0L10BS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Opcional: Ativa App Check (depois de configurar reCAPTCHA no console)
try {
  // initializeAppCheck(app, {
  //   provider: new ReCaptchaV3Provider('teu-recaptcha-site-key'),
  //   isTokenAutoRefreshEnabled: true
  // });
  // console.log("App Check ativado");
} catch (err) {
  console.warn("App Check não ativado:", err);
}

export {
  app,
  auth,
  db,
  storage,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  query,
  orderBy,
  serverTimestamp,
  ref,
  uploadBytes,
  getDownloadURL
};

console.log("firebase.js carregado com sucesso");