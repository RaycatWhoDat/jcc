import Vue from "vue";
import Vuex from "vuex";

import homeStore from "./modules/homeStore";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        homeStore
    }
});
