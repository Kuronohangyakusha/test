// counter.js
export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

export function createElement(tagName) {
  return document.createElement(tagName)
}

export function getElement(id) {
  return document.getElementById(id)
}

export function Connexion() {
  const s = `<div class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Connexion</h2>
    <form id="loginForm" class="space-y-5">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" required
               class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input type="password" id="password" name="password" required
               class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
      </div>
      <button id="connect" type="submit"
              class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
        Se connecter
      </button>
    </form>
    <p class="mt-4 text-center text-sm text-gray-600">
      Pas encore de compte ?
      <a href="#" class="text-blue-600 hover:underline">S'inscrire</a>
    </p>
  </div>`;
  return s
}

// Interface d'accueil après connexion réussie
export function home() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  const userName = currentUser.name || currentUser.email || 'Utilisateur';
  
  const help = `<div class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Bienvenue</h2>
    <div class="text-center">
      <p class="text-lg text-gray-700 mb-2">Hello World!</p>
      <p class="text-sm text-gray-600 mb-4">Connecté en tant que: ${userName}</p>
      <button id="logout" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">
        Se déconnecter
      </button>
    </div>
  </div>`;
  return help;
}

// Fonction pour récupérer les utilisateurs - URL mise à jour
export async function fetchUsers() {
  try {
    // Utilise l'URL relative pour Vercel ou l'URL absolue de votre déploiement
    const apiUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000/users'
      : '/api/users';
    
    console.log('Tentative de récupération depuis:', apiUrl);
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Utilisateurs récupérés:', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    
    // Fallback avec des utilisateurs en dur pour le débogage
    console.log('Utilisation des utilisateurs en dur');
    return [
      {
        "id": 1,
        "email": "nndeyendiaye85@gmail.com",
        "password": "password123"
      },
      {
        "id": 2,
        "email": "user2@example.com", 
        "password": "password456"
      }
    ];
  }
}