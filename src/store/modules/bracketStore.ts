import * as types from '@/store/mutation-types';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000';

const bracketStore = {
    state: {
        matchHistories: {},
        activeMatches: []
    },
    mutations: {
        [types.UPDATE_SCORE](state: any, payload: any) {
            const { gameId, playerId } = payload || {};
            state.activeMatches[gameId][`player${playerId}Victories`] += 1;
        },
        [types.GENERATE_ANALYSIS](state: any, payload: any) {
            const { results = [] } = payload || {};

            const defaultValues = {
                labels: [] as any
            };

            const matchesEnteredDataset = {
                label: 'Matches Entered',
                backgroundColor: '#d9ecc1',
                data: [] as any
            };

            const matchesWonDataset = {
                label: 'Matches Won',
                backgroundColor: '#a2bd84',
                data: [] as any
            };

            results.forEach((user: any) => {
                const { username, matchesEntered, matchesWon } = user;
                defaultValues.labels.push(username);
                matchesEnteredDataset.data.push(matchesEntered);
                matchesWonDataset.data.push(matchesWon);
            });

            state.matchHistories = {
                ...defaultValues,
                datasets: [matchesWonDataset, matchesEnteredDataset]
            };
        }
    },
    actions: {
        [types.ADD_VICTORY_TO_PLAYER]({ rootState, commit }: any, payload: any) {
            const { matchId, userId, otherUserId, playerId, gameId } = payload;

            axios
                .put(`${SERVER_URL}/db/records/${userId}`, { playerId, playerWon: true })
                .then(async () => {
                    await axios.put(`${SERVER_URL}/db/records/${otherUserId}`, {
                        playerId: playerId === 1 ? 2 : 1,
                        playerWon: false
                    });

                    const { player1Victories, player2Victories } = rootState.bracketStore.activeMatches[gameId] || {};

                    await axios.put(`${SERVER_URL}/db/matches`, {
                        matchId,
                        playerId,
                        matchFinished: player1Victories + 1 >= 3 || player2Victories + 1 >= 3
                    });

                    commit(types.UPDATE_SCORE, { gameId, playerId });

                    commit(types.SET_MATCHES_ENTERED, {
                        matchesEntered: rootState.appStore.matchesEntered.value + 1
                    });

                    commit(types.SET_MATCHES_WON, {
                        matchesWon: rootState.appStore.matchesWon.value + Number(rootState.currentUser.userId === userId)
                    });
                });
        },
        [types.GET_MATCH_HISTORIES]({ commit }: any) {
            axios
                .get(`${SERVER_URL}/db/records`)
                .then(({ data }: any) => {
                    commit(types.GENERATE_ANALYSIS, data);
                });
        },
        [types.PLACE_BET]({ rootState, commit }: any, payload: any) {
            const { betAmount, ...restOfPayload } = payload || {};

            axios
                .post(`${SERVER_URL}/db/bets`, {
                    betAmount,
                    ...restOfPayload
                })
                .then(() => {
                    commit(types.SET_CURRENT_BALANCE, {
                        currentBalance: rootState.currentUser.currentBalance - betAmount
                    });
                });
        },
        [types.GET_ACTIVE_MATCHES]({ state }: any) {
            axios
                .get(`${SERVER_URL}/db/matches`)
                .then(({ data }: any) => {
                    const { results = [] } = data || {};
                    state.activeMatches = results;
                });
        },
        [types.CREATE_MATCH]({ dispatch }: any, payload: any) {
            axios
                .post(`${SERVER_URL}/db/matches`, payload)
                .then(({ data }: any) => {
                    const { results } = data || {};
                    console.log('New match ID: ', results.matchId);
                    dispatch(types.GET_ACTIVE_MATCHES);
                });
        }
    }
};

export default bracketStore;
