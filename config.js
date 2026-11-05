// Configuração do Firebase (banco de dados e login do app) — projeto obrabit-visitas.
// Esses valores não são senha: a proteção dos dados está nas regras do banco (firestore.rules)
// e no login (só as contas cadastradas no Firebase entram; a inscrição pelo app está desativada).
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAACiQCkogpeAtyf6JpULmq0QfXM5_0fHM",
  authDomain: "obrabit-visitas.firebaseapp.com",
  projectId: "obrabit-visitas",
  storageBucket: "obrabit-visitas.firebasestorage.app",
  messagingSenderId: "576568257940",
  appId: "1:576568257940:web:ee2e529a76631720417381"
};
