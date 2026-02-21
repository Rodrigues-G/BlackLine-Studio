// assets/js/contact.js
// Lógica do formulário de contactos – envio para Firestore (pode ser anónimo)

import { db, addDoc, collection, serverTimestamp } from './firebase.js';

// ────────────────────────────────────────────────
// Handler do formulário de contactos
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  if (!form) {
    console.warn('Formulário de contacto não encontrado (id="contact-form")');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Captura dos campos (ajusta os IDs conforme o teu HTML real)
    const nome     = document.getElementById('nome')?.value.trim()     || '';
    const email    = document.getElementById('email')?.value.trim()    || '';
    const mensagem = document.getElementById('mensagem')?.value.trim() || '';

    // Validação básica
    if (!nome || !email || !mensagem) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      alert('O email parece inválido. Verifique por favor.');
      return;
    }

    try {
      await addDoc(collection(db, 'contacts'), {
        nome,
        email,
        mensagem,
        createdAt: serverTimestamp(),
        status: 'novo' // opcional – ajuda no dashboard admin
      });

      alert('Mensagem enviada com sucesso! Responderemos em breve.');
      form.reset(); // limpa o formulário
    } catch (error) {
      console.error('Erro ao enviar contacto:', error);
      alert('Ocorreu um erro ao enviar a mensagem. Tente novamente ou contacte-nos diretamente.');
    }
  });
});

console.log('contact.js carregado com sucesso');