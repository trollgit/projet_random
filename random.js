function randomIdea() {
    const randomButton = document.getElementById('draw-button');
    const randomIdeaContainer = document.getElementById('random-idea');
    const totalIdeas = document.getElementById('total-ideas');
    const ideasRef = db.ref('ideas/');

    let ideasArray = [];

    randomButton.addEventListener('click', () => {
        ideasRef.once('value').then((snapshot) => {
            const ideas = snapshot.val();
            ideasArray = [];

            if (ideas) {
                for (const key in ideas) {
                    const idea = ideas[key];
                    ideasArray.push({ id: key, ...idea });
                }
            }

            // Vérifiez si l'élément existe avant de manipuler innerHTML
            if (randomIdeaContainer) {
                if (ideasArray.length > 0) {
                    const randomIndex = Math.floor(Math.random() * ideasArray.length);
                    const randomIdea = ideasArray[randomIndex];
                    randomIdeaContainer.innerHTML = `
                        <strong>${randomIdea.title}</strong>
                        <p>${randomIdea.description}</p>
                    `;
                } else {
                    randomIdeaContainer.innerHTML = `<p>Aucune idée disponible.</p>`;
                }
            } else {
                console.error("L'élément random-idea n'a pas été trouvé.");
            }

            // Met à jour le nombre total d'idées
            if (totalIdeas) {
                totalIdeas.textContent = ideasArray.length;
            }
        });
    });
}
