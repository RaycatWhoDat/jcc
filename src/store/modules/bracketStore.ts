import Vue from 'vue';
import * as types from '@/store/mutation-types';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000';
const WINNING_SCORE = 3;

const bracketStore = {
    state: {
        matchHistories: {},
        matchSummaries: [],
        activeMatches: [],
        winPercentages: []
    },
    mutations: {
        [types.UPDATE_SCORE](state: any, payload: any) {
            const { gameId, playerId } = payload || {};
            state.activeMatches[gameId][`player${playerId}Victories`] += 1;

            const { player1Victories, player2Victories } = state.activeMatches[gameId];
            const matchFinished = player1Victories >= WINNING_SCORE || player2Victories >= WINNING_SCORE;
            Vue.set(state.activeMatches[gameId], 'matchFinished', matchFinished);
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
        },
        [types.GENERATE_MATCH_SUMMARIES](state: any) {
            state.matchSummaries = state.activeMatches.map((match: any) => {
                return [match.matchId, match.player1Username, match.player2Username];
            });
        },
        [types.GENERATE_WIN_PERCENTAGES](state: any, payload: any) {
            const { results = [] } = payload || {};

            results.sort((history1: any, history2: any) => {
                const winPercentage1 = history1.matchesWon / history1.matchesEntered;
                const winPercentage2 = history2.matchesWon / history2.matchesEntered;
                return winPercentage2 - winPercentage1;
            });

            state.winPercentages = results.slice(0, 3).map(({ matchesEntered, matchesWon, username }: any) => {
                return { username, winPercentage: (matchesWon / matchesEntered) * 100 };
            });
        }
    },
    actions: {
        [types.ADD_VICTORY_TO_PLAYER]({ rootState, state, commit, dispatch }: any, payload: any) {
            const { matchId, userId, otherUserId, playerId, gameId } = payload;

            axios
                .put(`${SERVER_URL}/db/records/${userId}`, { playerId, playerWon: true })
                .then(async () => {
                    await axios.put(`${SERVER_URL}/db/records/${otherUserId}`, {
                        playerId: playerId === 1 ? 2 : 1,
                        playerWon: false
                    });

                    const { currentUser } = rootState || {};
                    commit(types.UPDATE_SCORE, { gameId, playerId });

                    const { matchFinished } = state.activeMatches[gameId];
                    await axios.put(`${SERVER_URL}/db/matches`, { matchId, playerId, matchFinished });
                    if (matchFinished) {
                        dispatch(types.PAY_OUT_BETS, {
                            matchId,
                            bettingUserId: rootState.currentUser.userId,
                            winningUserId: userId
                        });
                    }

                    if (currentUser.userId !== userId && currentUser.userId !== otherUserId) return;

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
                    commit(types.GENERATE_WIN_PERCENTAGES, data);
                });
        },
        [types.PLACE_BET]: async ({ dispatch }: any, payload: any) => {
            const { betAmount, currentBalance, ...restOfPayload } = payload || {};

            return await axios
                .post(`${SERVER_URL}/db/bets`, { betAmount, ...restOfPayload })
                .then(() => dispatch(types.SET_CURRENT_BALANCE, { currentBalance }));
        },
        [types.GET_ACTIVE_MATCHES]({ state, commit }: any) {
            axios
                .get(`${SERVER_URL}/db/matches`)
                .then(({ data }: any) => {
                    const { results = [] } = data || {};
                    state.activeMatches = results;
                    commit(types.GENERATE_MATCH_SUMMARIES);
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
        },
        [types.PAY_OUT_BETS]({ rootState, dispatch }: any, payload: any) {
            const { matchId, bettingUserId, winningUserId } = payload || {};

            console.log('Match has finished. Paying out bets.');

            axios
                .get(`${SERVER_URL}/db/bets/${matchId}`)
                .then(({ data }: any) => {
                    const { results } = data || {};

                    const payoutAmount = results.reduce((_payoutAmount: number, bet: any) => {
                        if (bet.bettingUserId !== bettingUserId || bet.winningUserId !== winningUserId) return _payoutAmount;
                        return _payoutAmount + (bet.betAmount * 2);
                    }, 0);

                    if (!payoutAmount) return;
                    dispatch(types.SET_CURRENT_BALANCE, {
                        currentBalance: rootState.currentUser.currentBalance + payoutAmount
                    });
                });
        }
    }
};

export default bracketStore;
