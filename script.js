const files = [
    {
        name: "Design-Brief.pdf",
        type: "PDF",
        updated: "2h ago",
        location: "pins",
        icon: "PDF",
        comments: "Approved for kickoff. Finalize the launch copy before Friday.",
        tags: ["Brief", "Approved", "Launch"]
    },
    {
        name: "Brand-Assets",
        type: "Folder",
        updated: "Yesterday",
        location: "pins",
        icon: "DIR",
        comments: "Contains the latest icon exports and presentation artwork.",
        tags: ["Assets", "Shared"]
    },
    {
        name: "Q2-Roadmap.xlsx",
        type: "Sheet",
        updated: "3d ago",
        location: "pins",
        icon: "XLS",
        comments: "Review dependency dates with product before the next stakeholder sync.",
        tags: ["Planning", "Finance"]
    },
    {
        name: "Sprint-Retro.docx",
        type: "Doc",
        updated: "20m ago",
        location: "recents",
        icon: "DOC",
        comments: "Fresh notes from today's retrospective.",
        tags: ["Notes", "Sprint"]
    },
    {
        name: "Customer-Quotes.txt",
        type: "Text",
        updated: "1h ago",
        location: "recents",
        icon: "TXT",
        comments: "Ready for the testimonials carousel draft.",
        tags: ["Copy", "Review"]
    },
    {
        name: "Mockup-v4.fig",
        type: "Design",
        updated: "4h ago",
        location: "recents",
        icon: "FIG",
        comments: "Latest homepage treatment with sidebar interactions.",
        tags: ["Design", "Pinned"]
    }
];

const sections = {
    pins: document.getElementById("pins"),
    recents: document.getElementById("recents")
};

const selectedName = document.getElementById("selected-name");
const selectedMeta = document.getElementById("selected-meta");
const renameInput = document.getElementById("rename");
const commentsInput = document.getElementById("comments");
const selectedTags = document.getElementById("selected-tags");
const tagInput = document.getElementById("tag-input");

function renderTags(tags) {
    selectedTags.innerHTML = "";
    tags.forEach((tag) => {
        const pill = document.createElement("span");
        pill.className = "tag";
        pill.textContent = tag;
        selectedTags.appendChild(pill);
    });
}

function updateSidebar(file, card) {
    document.querySelectorAll(".file-card").forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    selectedName.textContent = file.name;
    selectedMeta.textContent = `${file.type} · Updated ${file.updated}`;
    renameInput.value = file.name;
    commentsInput.value = file.comments;
    tagInput.value = file.tags.join(", ");
    renderTags(file.tags);
}

function makeCard(file) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "file-card";
    button.innerHTML = `
        <div class="file-icon">${file.icon}</div>
        <div>
            <div class="file-title">${file.name}</div>
        </div>
        <div class="file-meta">
            <span>${file.type}</span>
            <span>${file.updated}</span>
        </div>
        <div class="tag-list">
            ${file.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
    `;
    button.addEventListener("click", () => updateSidebar(file, button));
    return button;
}

files.forEach((file) => {
    sections[file.location].appendChild(makeCard(file));
});

updateSidebar(files[0], document.querySelector(".file-card"));
