// main.js
import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { createElement, getElement, Connexion, fetchUsers, home } from './counter.js'

let users = []
let currentUser = null

// Fonction pour sauvegarder l'état de connexion
function saveLoginState(user) {
  sessionStorage.setItem('currentUser', JSON.stringify(user));
  currentUser = user;
}

// Fonction pour récupérer l'état de connexion
function getLoginState() {
  const savedUser = sessionStorage.getItem('currentUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    return currentUser;
  }
  return null;
}

// Fonction pour supprimer l'état de connexion
function clearLoginState() {
  sessionStorage.removeItem('currentUser');
  currentUser = null;
}

// Fonction pour initialiser l'application
async function initApp() {
  // Charger les utilisateurs
  users = await fetchUsers();
  
  // Vérifier si l'utilisateur est déjà connecté
  const savedUser = getLoginState();
  
  if (savedUser) {
    // Utilisateur déjà connecté, afficher l'accueil
    console.log('Utilisateur déjà connecté:', savedUser);
    showHome();
  } else {
    // Pas d'utilisateur connecté, afficher la connexion
    showLogin();
  }
}

// Fonction pour afficher l'interface d'accueil
function showHome() {
  const container = getElement('container');
  if (container) {
    container.innerHTML = home();
    
    // Configurer le bouton de déconnexion
    const logoutBtn = getElement('logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        // Supprimer l'état de connexion et retourner à l'écran de connexion
        clearLoginState();
        console.log('Déconnexion effectuée');
        showLogin();
      });
    }
  }
}

// Fonction pour afficher l'interface de connexion
function showLogin() {
  const container = getElement('container');
  if (container) {
    container.innerHTML = Connexion();
    setupEventListeners();
  }
}

// Fonction pour configurer les événements
function setupEventListeners() {
  const connect = getElement('connect');
  const email = getElement('email');
  const password = getElement('password');
  const loginForm = getElement('loginForm');
  
  if (connect && email && password) {
    // Écouter l'événement de soumission du formulaire
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const emailValue = email.value;
      const passwordValue = password.value;
      
      console.log('Tentative de connexion:', {
        email: emailValue,
        password: passwordValue
      });
      
      // Vérifier les identifiants avec les utilisateurs récupérés
      const user = users.find(u => u.email === emailValue && u.password === passwordValue);
      
      if (user) {
        console.log('Connexion réussie!', user);
        // Sauvegarder l'état de connexion et afficher l'interface d'accueil
        saveLoginState(user);
        showHome();
      } else {
        console.log('Identifiants incorrects');
        alert('Identifiants incorrects');
      }
    });
  }
}

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
  initApp();
});