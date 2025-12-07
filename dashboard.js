window.onload = function () {
    updateStats();

    const search = document.getElementById("search");
    search.addEventListener("input", filterProjects);
};

function updateStats() {
    const cards = document.querySelectorAll(".project-card");

    let total = cards.length;
    let inProgress = 0;
    let exported = 0;

    cards.forEach(card => {
        let status = card.dataset.status;

        if (status === "inprogress") inProgress++;
        if (status === "exported") exported++;
    });

    document.getElementById("total-projects").textContent = total;
    document.getElementById("in-progress").textContent = inProgress;
    document.getElementById("exported").textContent = exported;
}

function filterProjects() {
    const term = document.getElementById("search").value.toLowerCase();
    const cards = document.querySelectorAll(".project-card");

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(term) ? "block" : "none";
    });
}

