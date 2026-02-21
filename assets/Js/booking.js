// assets/js/booking.js
import { auth, db, addDoc, collection, serverTimestamp, onAuthStateChanged } from './firebase.js';

let currentUser = null;

// Verifica login ao carregar a página
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  const form = document.getElementById('booking-form');
  const messageDiv = document.getElementById('booking-message');  // adiciona este div no HTML para mensagens

  if (!user) {
    // Não logado: Bloqueia form e mostra mensagem
    form.classList.add('hidden');  // esconde form
    messageDiv.innerHTML = `<p class="text-red-500 text-center">Para agendar, faz <a href="client-login.html" class="underline hover:text-red-700">login ou cria uma conta</a>.</p>`;
  } else {
    form.classList.remove('hidden');
    messageDiv.innerHTML = '';  // limpa mensagem
  }
});
// Dentro do onAuthStateChanged ou no DOMContentLoaded
if (!user) {
  document.getElementById('booking-notification').classList.remove('hidden');

  // Fecha ao clicar no X
  document.getElementById('close-notification')?.addEventListener('click', () => {
    document.getElementById('booking-notification').classList.add('hidden');
  });

  // Esconde o form de agendamento (opcional)
  document.getElementById('booking-form')?.classList.add('hidden');
} else {
  document.getElementById('booking-notification').classList.add('hidden');
  document.getElementById('booking-form')?.classList.remove('hidden');
}

// Handler do submit (só roda se logado)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Precisas de estar logado para agendar!');
      window.location.href = 'client-login.html';
      return;
    }

    // Pega valores (ajusta IDs conforme o teu form)
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    // Validação
    if (!nome || !email || !mensagem || !data || !hora) {
      alert('Preenche todos os campos!');
      return;
    }
    if (!email.includes('@')) {
      alert('Email inválido!');
      return;
    }

    try {
      await addDoc(collection(db, 'bookings'), {
        nome,
        email,
        mensagem,
        data,
        hora,
        userId: currentUser.uid,  // associa ao cliente logado
        createdAt: serverTimestamp()
      });
      alert('Marcação enviada com sucesso!');
      form.reset();
    } catch (error) {
      alert('Erro ao enviar: ' + error.message);
    }
  });
});