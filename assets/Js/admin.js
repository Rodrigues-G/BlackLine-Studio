// assets/js/admin.js
import { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from './firebase.js';

const loginForm = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = 'admin/dashboard.html';
    } catch (err) {
      errorMsg.textContent = 'Credenciais inválidas. Tenta novamente.';
    }
  });
}

// Proteção em dashboard.html (coloca isto no topo do script em dashboard.html)
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = '../login.html'; // ou '/login.html'
  }
});