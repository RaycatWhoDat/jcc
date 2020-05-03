import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Attract from "../views/Attract.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Attract",
        component: Attract
    },
    {
        path: "/home",
        name: "Home",
        component: Home
    },
    {
        path: "/brackets",
        name: "Brackets",
        component: Home
    },
    {
        path: "/matches",
        name: "Matches",
        component: Home
    },
    {
        path: "/analysis",
        name: "Analysis",
        component: Home
    }
    // component: () => import("../views/About.vue")
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
