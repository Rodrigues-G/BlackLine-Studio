// assets/js/admin.js
// Lógica completa para área administrativa: login, proteção de rotas e logout

import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from './firebase.js';

// ────────────────────────────────────────────────
// 1. Login administrativo
const loginForm = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    if (!emailField || !passwordField) {
      console.error('Campos de email ou password não encontrados no HTML.');
      return;
    }

    const email = emailField.value.trim();
    const password = passwordField.value;

    if (!email || !password) {
      errorMsg.textContent = 'Preencha email e password.';
      errorMsg.classList.remove('hidden');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      errorMsg.classList.add('hidden');
      window.location.href = 'admin/dashboard.html'; // ajusta o caminho se necessário
    } catch (err) {
      console.error('Erro no login admin:', err.code, err.message);

      let message = 'Erro ao entrar. Tente novamente.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        message = 'Email ou password incorretos.';
      } else if (err.code === 'auth/user-not-found') {
        message = 'Utilizador não encontrado.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Muitas tentativas. Aguarde alguns minutos.';
      }

      errorMsg.textContent = message;
      errorMsg.classList.remove('hidden');
    }
  });
}

// ────────────────────────────────────────────────
// 2. Proteção de páginas administrativas (ex: dashboard.html)
onAuthStateChanged(auth, (user) => {
  const isAdminPage = window.location.pathname.includes('dashboard.html') ||
                      window.location.pathname.includes('admin/');

  if (isAdminPage && !user) {
    console.log('Acesso negado: redirecionando para login');
    window.location.href = '../login.html'; // ajusta o caminho relativo se necessário
  }

  // Opcional: mostrar email do admin logado (se houver elemento com id="admin-email")
  if (user && document.getElementById('admin-email')) {
    document.getElementById('admin-email').textContent = user.email;
  }
});

// ────────────────────────────────────────────────
// 3. Logout (chamado por botão com id="logout-btn")
document.addEventListener('click', async (e) => {
  if (e.target && e.target.id === 'logout-btn') {
    e.preventDefault();
    try {
      await signOut(auth);
      window.location.href = '../login.html';
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
      alert('Erro ao sair. Tente novamente.');
    }
  }
});

console.log('admin.js carregado com sucesso');