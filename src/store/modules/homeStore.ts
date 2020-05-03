const homeStore = {
    state: () => (
        {
            facts: [
                { id: 1, icon: "medal", text: "Did you know? This capstone project is pain. But it's all that remains." }
            ],
            stats: [
                { id: 1, headerText: "Current Balance", value: "$" + (Math.random() * 9999 + 1).toFixed(2) },
                { id: 2, headerText: "Number of Brackets Entered", value: Math.floor(Math.random() * 50) + 1 },
                { id: 3, headerText: "Number of Bets Won", value: Math.floor(Math.random() * 100) + 1 }
            ],
            entries: [
                { id: 1, icon: "thumbs-up-outline", text: "Item 1" },
                { id: 2, icon: "thumbs-up-outline", text: "Item 2" },
                { id: 3, icon: "thumbs-down-outline", text: "Item 3" }
            ],
            brackets: [
                { id: 1, icon: "trophy-outline", text: "The match between User 1 and User 7 is in progress." },
                { id: 2, icon: "trophy-outline", text: "The match between User 2 and User 6 is in progress." },
                { id: 3, icon: "trophy-outline", text: "The match between User 3 and User 5 is in progress." }
            ]
        }),
    mutations: {},
    actions: {}
};

export default homeStore;
