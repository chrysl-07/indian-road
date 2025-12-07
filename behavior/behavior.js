// Load saved behaviors from localStorage
let behaviors = JSON.parse(localStorage.getItem("behaviors")) || [];

// DOM elements
const behaviorNameInput = document.getElementById("behaviorName");
const behaviorDescInput = document.getElementById("behaviorDesc");
const addButton = document.getElementById("addBehavior");
const behaviorList = document.getElementById("behaviorList");

// Display behaviors on page load
renderBehaviors();

// Add new behavior
addButton.addEventListener("click", () => {
    const name = behaviorNameInput.value.trim();
    const description = behaviorDescInput.value.trim();

    if (!name || !description) {
        alert("Please fill both fields!");
        return;
    }

    const newBehavior = { id: Date.now(), name, description };
    behaviors.push(newBehavior);

    saveAndRender();
    clearForm();
});

// Render behavior cards
function renderBehaviors() {
    behaviorList.innerHTML = "";

    if (behaviors.length === 0) {
        behaviorList.innerHTML = "<p>No behaviors added yet.</p>";
        return;
    }

    behaviors.forEach((b) => {
        const card = document.createElement("div");
        card.classList.add("behavior-card");

        card.innerHTML = `
            <div class="behavior-name">${b.name}</div>
            <div class="behavior-desc">${b.description}</div>
            <button class="delete-btn" onclick="deleteBehavior(${b.id})">Delete</button>
        `;

        behaviorList.appendChild(card);
    });
}

// Delete a behavior
function deleteBehavior(id) {
    behaviors = behaviors.filter((b) => b.id !== id);
    saveAndRender();
}

// Save to local storage + refresh UI
function saveAndRender() {
    localStorage.setItem("behaviors", JSON.stringify(behaviors));
    renderBehaviors();
}

// Clear inputs
function clearForm() {
    behaviorNameInput.value = "";
    behaviorDescInput.value = "";
}
