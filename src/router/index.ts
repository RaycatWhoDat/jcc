import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "@/views/Home.vue";
import Attract from "@/views/Attract.vue";
import NotFound from "@/views/NotFound.vue";
import Dashboard from "@/views/Dashboard.vue";
import Brackets from "@/views/Brackets.vue";
import Matches from "@/views/Matches.vue";
import Analysis from "@/views/Analysis.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Attract",
        component: Attract
    },
    {
        path: "/app",
        name: "Dashboard",
        component: Home,
        children: [
            {
                path: "home",
                name: "Home",
                component: Dashboard
            },
            {
                path: "brackets",
                name: "Brackets",
                component: Brackets
            },
            {
                path: "matches",
                name: "Matches",
                component: Matches
            },
            {
                path: "analysis",
                name: "Analysis",
                component: Analysis
            }
        ],
    },
    {
        path: '*',
        name: "Missing",
        component: NotFound
    }
    // component: () => import("../views/About.vue")
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
