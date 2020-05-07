import * as types from '@/store/mutation-types';

const appStore = {
    state: {
        currentBalance: {
            panelType: 'currency',
            value: 0
        },
        matchesEntered: {
            panelType: 'number',
            value: 0
        },
        matchesWon: {
            panelType: 'number',
            value: 0
        }
    },
    mutations: {
        [types.SET_CURRENT_BALANCE](state: any, payload: any) {
            const { currentBalance = 0 } = payload || {};
            state.currentBalance.value = currentBalance;
        },
        [types.SET_MATCHES_ENTERED](state: any, payload: any) {
            const { matchesEntered = 0 } = payload || {};
            state.matchesEntered.value = matchesEntered;
        },
        [types.SET_MATCHES_WON](state: any, payload: any) {
            const { matchesWon = 0 } = payload || {};
            state.matchesWon.value = matchesWon;
        }
    },
    actions: {}
};

export default appStore;
