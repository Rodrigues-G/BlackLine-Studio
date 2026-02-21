// assets/js/booking.js
// Lógica de agendamento: exige login do cliente, validação e envio para Firestore

import {
  auth,
  db,
  addDoc,
  collection,
  serverTimestamp,
  onAuthStateChanged
} from './firebase.js';

// ────────────────────────────────────────────────
// Variável global para o utilizador atual
let currentUser = null;

// ────────────────────────────────────────────────
// Verifica autenticação e controla visibilidade do form + notificação
onAuthStateChanged(auth, (user) => {
  currentUser = user;

  const form = document.getElementById('booking-form');
  const notification = document.getElementById('booking-notification');

  if (!user) {
    // Não logado: esconde form e mostra notificação flutuante
    if (form) form.classList.add('hidden');
    if (notification) notification.classList.remove('hidden');
  } else {
    // Logado: mostra form e esconde notificação
    if (form) form.classList.remove('hidden');
    if (notification) notification.classList.add('hidden');
  }
});

// ────────────────────────────────────────────────
// Handler do formulário de agendamento
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-form');
  const notification = document.getElementById('booking-notification');
  const closeBtn = document.getElementById('close-notification');

  if (!form) {
    console.warn('Formulário de booking não encontrado (id="booking-form")');
    return;
  }

  // Fechar notificação ao clicar no X (se existir)
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (notification) notification.classList.add('hidden');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('É necessário estar logado para agendar uma sessão.');
      window.location.href = 'client-login.html';
      return;
    }

    // Captura dos campos (ajusta os IDs conforme o teu HTML real)
    const nome      = document.getElementById('nome')?.value.trim()     || '';
    const email     = document.getElementById('email')?.value.trim()    || '';
    const mensagem  = document.getElementById('mensagem')?.value.trim() || '';
    const data      = document.getElementById('data')?.value           || '';
    const hora      = document.getElementById('hora')?.value           || '';

    // Validação básica
    if (!nome || !email || !mensagem || !data || !hora) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      alert('O email parece inválido. Verifique por favor.');
      return;
    }

    try {
      await addDoc(collection(db, 'bookings'), {
        nome,
        email,
        mensagem,
        data,
        hora,
        userId: currentUser.uid,          // associa ao cliente logado
        createdAt: serverTimestamp(),
        status: 'pendente'                // opcional – ajuda no dashboard admin
      });

      alert('Marcação enviada com sucesso! Entraremos em contacto em breve.');
      form.reset(); // limpa o form
    } catch (error) {
      console.error('Erro ao enviar marcação:', error);
      alert('Ocorreu um erro ao enviar a marcação. Tente novamente ou contacte-nos diretamente.');
    }
  });
});

console.log('booking.js carregado com sucesso');