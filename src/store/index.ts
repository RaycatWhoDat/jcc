import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";

import * as types from './mutation-types';
import homeStore from "./modules/homeStore";
import appStore from "./modules/appStore";
import bracketStore from "./modules/bracketStore";
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: {},
        popoutMenuActive: false,
        hideSidebar: true
    },
    mutations: {
        [types.SIGN_OUT](state) {
            state.hideSidebar = true;
            state.currentUser = {};

            router.replace({ path: '/' }).catch(() => null);
        },
        [types.TOGGLE_POPOUT_MENU](state) {
            state.popoutMenuActive = !state.popoutMenuActive;
        }
    },
    actions: {
        [types.LOG_IN]({ state, dispatch }, payload) {
            const { username, password } = payload;
            return axios.post(`${SERVER_URL}/db/auth`, { username, password })
                .then(({ data }) => {
                    const { results: { userId } } = data || {};
                    if (userId == null) return;

                    state.currentUser = { userId };
                    state.hideSidebar = false;
                    dispatch(types.SET_CURRENT_USER);
                    router.push({ path: 'app/home' });
                });
        },
        [types.SET_CURRENT_USER]({ state, commit, dispatch }: any) {
            const { userId } = state.currentUser || {};
            if (userId == null) return commit(types.SIGN_OUT);
            axios.get(`${SERVER_URL}/db/users/${userId}`)
                .then(({ data }) => {
                    const { currentBalance, matchesEntered, matchesWon, ...currentUser } = data;
                    state.currentUser = { ...currentUser };
                    dispatch(types.SET_CURRENT_BALANCE, { currentBalance });
                    commit(types.SET_MATCHES_ENTERED, { matchesEntered });
                    commit(types.SET_MATCHES_WON, { matchesWon });
                }, () => {
                    console.error('Something went wrong when assigning the current user.');
                });
        },
        [types.SET_CURRENT_BALANCE]({ state, commit }, { currentBalance }) {
            axios
                .put(`${SERVER_URL}/db/balances/1`, { currentBalance })
                .then(() => {
                    Vue.set(state.currentUser, 'currentBalance', currentBalance);
                    commit(types.SET_CURRENT_BALANCE, { currentBalance });
                });
        }
    },
    modules: {
        homeStore,
        appStore,
        bracketStore
    }
});
