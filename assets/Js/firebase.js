// Importa app principal
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

// Importa tudo sobre autenticação
import {
  getAuth,                          // Cria instância de auth
  signInWithEmailAndPassword,       // Login com email/senha
  createUserWithEmailAndPassword,   // Registo com email/senha
  onAuthStateChanged,               // Monitoriza login/logout
  signOut,                          // Faz logout
  updateProfile,                    // Muda nome e foto
  updateEmail,                      // Muda email
  reauthenticateWithCredential,     // Revalida senha (para ações sensíveis)
  EmailAuthProvider                 // Tipo de credencial email/senha
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Importa tudo sobre Firestore (base de dados)
import {
  getFirestore,                     // Cria instância do Firestore
  collection,                       // Aponta para coleção
  addDoc,                           // Adiciona documento novo
  getDocs,                          // Lê vários documentos
  deleteDoc,                        // Apaga documento
  doc,                              // Aponta para documento específico
  getDoc,                           // Lê um documento
  setDoc,                           // Cria ou atualiza documento
  query,                            // Cria consulta avançada
  orderBy,                          // Ordena resultados
  serverTimestamp                   // Data/hora do servidor
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Importa tudo sobre Storage (para guardar fotos)
import {
  getStorage,                       // Cria instância do Storage
  ref,                              // Cria referência a caminho
  uploadBytes,                      // Envia ficheiro
  getDownloadURL                    // Gera link público
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

// Config do teu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwUD2aQ1vi4hSOmtHKJk3f7ja3A1Q_9PI",
  authDomain: "tatu-shop.firebaseapp.com",
  projectId: "tatu-shop",
  storageBucket: "tatu-shop.firebasestorage.app",
  messagingSenderId: "1008153357554",
  appId: "1:1008153357554:web:470bda1ded3c71b5fdb46b",
  measurementId: "G-PLHL0L10BS"
};

// Inicia a app uma única vez
const app = initializeApp(firebaseConfig);

// Cria serviços
const auth    = getAuth(app);     // Autenticação
const db      = getFirestore(app); // Base de dados
const storage = getStorage(app);  // Armazenamento de ficheiros

// 1. Configura reCAPTCHA no Firebase Console
try {
   initializeAppCheck(app, {
   provider: new ReCaptchaV3Provider('teu-recaptcha-site-key'),
   isTokenAutoRefreshEnabled: true
  });
  console.log("App Check ativado");
} catch (err) {
  console.warn("App Check não ativado:", err);
}

// Tudo o que os outros ficheiros vão usar
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

// Confirma que o ficheiro carregou
console.log("firebase.js carregado com sucesso");