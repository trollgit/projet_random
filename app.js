// Configuration Firebase
const firebaseConfig = {
    apiKey: "TA_CLÉ_API",
    authDomain: "TON_PROJET.firebaseapp.com",
    databaseURL: "https://TON_PROJET.firebaseio.com",
    projectId: "TON_PROJET",
    storageBucket: "TON_PROJET.appspot.com",
    messagingSenderId: "TON_MESSAGING_ID",
    appId: "TON_APP_ID"
};

// Initialisation Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Ajouter une idée (pour `adideas.html`)
function addIdea(title, description) {
    db.ref('ideas/').push({
        title: title,
        description: description
    });
}

// Afficher les idées (pour `printideas.html`)
function displayIdeas() {
    const ideaList = document.getElementById('idea-list');
    const totalIdeas = document.getElementById('total-ideas');
    db.ref('ideas/').on('value', (snapshot) => {
        ideaList.innerHTML = ''; // Réinitialise la liste des idées
        let count = 0;

        snapshot.forEach((childSnapshot) => {
            const idea = childSnapshot.val();
            const listItem = document.createElement('li');
            listItem.textContent = idea.title; // Affiche uniquement le titre
            ideaList.appendChild(listItem);
            count++;
        });

        // Met à jour le nombre total d'idées
        totalIdeas.textContent = `Total d'idées : ${count}`;
    });
}

// Gestion des formulaires
function handleFormSubmission(formId, callback) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        callback(data);
        form.reset();
    });
}

// Initialisation pour chaque page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.body.id; // ID de la page (défini dans chaque HTML)

    if (currentPage === 'adideas-page') {
        // Page "Ajouter une idée"
        handleFormSubmission('add-idea-form', (data) => {
            addIdea(data['idea-title'], data['idea-description']);
            alert('Votre idée a été ajoutée avec succès !');
        });
    } else if (currentPage === 'printideas-page') {
        // Page "Afficher les idées"
        displayIdeas();
    }
});
