const ideasList = document.getElementById('ideas-list');
const ideaInput = document.getElementById('idea-input');
const randomIdeaDisplay = document.getElementById('random-idea');
let ideas = JSON.parse(localStorage.getItem('ideas')) || [];

// Affiche les idées existantes
function displayIdeas() {
    ideasList.innerHTML = '';
    ideas.forEach((idea, index) => {
        const li = document.createElement('li');
        li.textContent = idea;
        li.addEventListener('click', () => removeIdea(index));
        ideasList.appendChild(li);
    });
}

// Ajoute une idée
function addIdea() {
    const idea = ideaInput.value.trim();
    if (idea) {
        ideas.push(idea);
        localStorage.setItem('ideas', JSON.stringify(ideas));
        ideaInput.value = '';
        displayIdeas();
    }
}

// Supprime une idée
function removeIdea(index) {
    ideas.splice(index, 1);
    localStorage.setItem('ideas', JSON.stringify(ideas));
    displayIdeas();
}

// Tire une idée au sort
function drawIdea() {
    if (ideas.length > 0) {
        const randomIndex = Math.floor(Math.random() * ideas.length);
        randomIdeaDisplay.textContent = `Prochaine idée : ${ideas[randomIndex]}`;
    } else {
        randomIdeaDisplay.textContent = 'Aucune idée disponible.';
    }
}

// Événements
document.getElementById('add-idea-btn').addEventListener('click', addIdea);
document.getElementById('draw-idea-btn').addEventListener('click', drawIdea);

// Initialisation
displayIdeas();
