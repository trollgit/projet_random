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
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Afficher les idées (pour `printideas.html`)
function displayIdeas() {
    const ideaList = document.getElementById('ideas-list');
    const totalIdeas = document.getElementById('total-ideas');
    db.ref('ideas/').on('value', (snapshot) => {
        ideaList.innerHTML = ''; // Réinitialise la liste des idées
        let count = 0;

        snapshot.forEach((childSnapshot) => {
            const idea = childSnapshot.val();
            const ideaId = childSnapshot.key; // Récupère l'ID de l'idée
            const listItem = document.createElement('li');
            listItem.classList.add('idea-item');
            listItem.innerHTML = `
                <strong>${idea.title}</strong>
                <p>${idea.description}</p>
                <button onclick="deleteIdea('${ideaId}')">Supprimer</button>
            `;
            ideaList.appendChild(listItem);
            count++;
        });

        // Met à jour le nombre total d'idées
        totalIdeas.textContent = `Total d'idées : ${count}`;
    });
}

// Supprimer une idée
function deleteIdea(ideaId) {
    db.ref('ideas/' + ideaId).remove()
        .then(() => {
            console.log('Idée supprimée avec succès');
        })
        .catch((error) => {
            console.error('Erreur lors de la suppression de l\'idée:', error);
        });
}

// Initialisation pour chaque page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.body.id; // ID de la page (défini dans chaque HTML)

    if (currentPage === 'printideas-page') {
        // Page "Afficher les idées"
        displayIdeas();
    }
});
