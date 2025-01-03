// Importation des modules Firebase v9
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCxupN3mXqxaNjc1LAvDbwZ7Z3gML7vPYE",
    authDomain: "randomidee-e6cdc.firebaseapp.com",
    databaseURL: "https://randomidee-e6cdc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "randomidee-e6cdc",
    storageBucket: "randomidee-e6cdc.appspot.com",
    messagingSenderId: "920175592676",
    appId: "1:920175592676:web:f24b964cbf8ec624fa58f1"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Sélectionner les éléments du DOM
const totalIdeas = document.getElementById('total-ideas');
const ideasList = document.getElementById('ideas-list');

// Charger les idées depuis Firebase
const ideasRef = ref(db, 'ideas/');
onValue(ideasRef, (snapshot) => {
    const ideas = snapshot.val();
    ideasList.innerHTML = ''; // Vider la liste
    let count = 0;

    if (ideas) {
        for (const key in ideas) {
            const idea = ideas[key];
            const listItem = document.createElement('li');
            listItem.classList.add('idea-item');
            listItem.innerHTML = `
                <strong>${idea.title}</strong>
                <p>${idea.description}</p>
                <button class="delete-button" onclick="deleteIdea('${key}')">Supprimer</button>
            `;
            ideasList.appendChild(listItem);
            count++;
        }
    }
    totalIdeas.textContent = count; // Mettre à jour le compteur
}, (error) => {
    console.error("Erreur lors de la récupération des données :", error);
});

// Fonction pour supprimer une idée
function deleteIdea(ideaId) {
    const ideaRef = ref(db, 'ideas/' + ideaId);
    remove(ideaRef).then(() => {
        console.log("Idée supprimée avec succès");
    }).catch((error) => {
        console.error("Erreur lors de la suppression de l'idée :", error);
    });
}

// Attacher la fonction deleteIdea à l'objet global `window`
window.deleteIdea = deleteIdea;
