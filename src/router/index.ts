import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "@/views/Home.vue";
import Attract from "@/views/Attract.vue";
import NotFound from "@/views/NotFound.vue";
import Dashboard from "@/views/Dashboard.vue";
import Watch from "@/views/Watch.vue";
import Analyze from "@/views/Analyze.vue";
import Bet from "@/views/Bet.vue";
import Play from "@/views/Play.vue";

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
        component: Dashboard,
        children: [
            {
                path: "home",
                name: "Home",
                component: Home
            },
            {
                path: "play",
                name: "Play",
                component: Play
            },
            {
                path: "watch",
                name: "Watch",
                component: Watch
            },
            {
                path: "analyze",
                name: "Analyze",
                component: Analyze
            },
            {
                path: "bet",
                name: "Bet",
                component: Bet
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
