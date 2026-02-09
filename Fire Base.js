// Import Firebase modules (versão modular CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração do teu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwUD2aQ1vi4hSOmtHKJk3f7ja3A1Q_9PI",
  authDomain: "tatu-shop.firebaseapp.com",
  databaseURL: "https://tatu-shop-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tatu-shop",
  storageBucket: "tatu-shop.firebasestorage.app",
  messagingSenderId: "1008153357554",
  appId: "1:1008153357554:web:470bda1ded3c71b5fdb46b",
  measurementId: "G-PLHL0L10BS"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
