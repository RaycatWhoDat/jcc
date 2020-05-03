import Vue from "vue";
import Vuex from "vuex";

import * as types from './mutation-types';
import homeStore from "./modules/homeStore";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: {},
        popoutMenuActive: false
    },
    mutations: {
        [types.TOGGLE_POPOUT_MENU](state) {
            state.popoutMenuActive = !state.popoutMenuActive;
        }
    },
    actions: {},
    modules: {
        homeStore
    }
});
