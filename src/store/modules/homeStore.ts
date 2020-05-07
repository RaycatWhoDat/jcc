const homeStore = {
    state: {
        facts: [
            { id: 1, icon: "medal", text: "Did you know? This capstone project is pain. But it's all that remains." }
        ],
        logs: [
            { id: 1, icon: "thumbs-up-outline", text: "Nam a sapien." },
            { id: 2, icon: "thumbs-up-outline", text: "Phasellus neque orci, porta a, aliquet quis, semper a, massa." },
            { id: 3, icon: "thumbs-down-outline", text: "Sed bibendum." }
        ],
        brackets: [
            { id: 1, icon: "trophy-outline", text: "The match between User 1 and User 7 is in progress." },
            { id: 2, icon: "trophy-outline", text: "The match between User 2 and User 6 is in progress." },
            { id: 3, icon: "trophy-outline", text: "The match between User 3 and User 5 is in progress." }
        ]
    },
    mutations: {},
    actions: {}
};

export default homeStore;
