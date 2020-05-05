const appStore = {
    state: {
        stats: [
            { id: 1, headerText: "Current Balance", panelType: 'currency', value: "$" + (Math.random() * 9999 + 1).toFixed(2) },
            { id: 2, headerText: "Number of Brackets Entered", panelType: 'number', value: String(Math.floor(Math.random() * 50) + 1) },
            { id: 3, headerText: "Number of Bets Won", panelType: 'number', value: String(Math.floor(Math.random() * 100) + 1) }
        ]
    },
    mutations: {},
    actions: {}
};

export default appStore;
