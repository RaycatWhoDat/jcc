<template>
    <section id="application">
        <aside id="sidebar" v-if="!hideSidebar">
            <div id="logo">
                <span class="large-letter serif">R</span>
            </div>
            <nav id="side-menu" class="sans-serif">
                <router-link class="link bold" active-class="active" to="/app/home">
                    <ion-icon name="home"></ion-icon>
                </router-link>
                <router-link class="link bold serif" active-class="active" to="/app/play">PLAY</router-link>
                <router-link class="link bold serif" active-class="active" to="/app/watch">WATCH</router-link>
                <router-link class="link bold serif" active-class="active" to="/app/bet">BET</router-link>
                <router-link class="link bold serif" active-class="active" to="/app/analyze">ANALYZE</router-link>
            </nav>
            <nav id="avatar-menu">
                <div id="avatar-popout" class="serif" v-if="popoutMenuActive">
                    <span class="popout-item bold" v-once>{{currentUser.username}}</span>
                    <hr />
                    <span class="popout-item">Sign Out</span>
                </div>
                <div id="avatar-button" @click="togglePopoutMenu()">
                    <img class="avatar" alt="User avatar" src="https://placekitten.com/g/200/200" />
                </div>
            </nav>
        </aside>
        <main id="main-view">
            <router-view />
            <span id="accent-text" class="large-letter italic serif">{{ $route.name.toUpperCase() }}</span>
        </main>
    </section>
</template>

<script>
 import { mapState, mapMutations } from 'vuex';
 import * as types from '@/store/mutation-types';

 export default {
     name: 'App',
     created() {
         this.$store.dispatch(types.SET_CURRENT_USER);
     },
     data() {
         return {
             hideSidebar: ['Attract', 'Missing'].includes(this.$route.name),
         }
     },
     computed: mapState(['currentUser', 'popoutMenuActive']),
     methods: {
         ...mapMutations({
             togglePopoutMenu: types.TOGGLE_POPOUT_MENU
         })
     }
 }
</script>

<style lang="scss">
 #application {
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     background-color: $rps-white;
     color: $rps-black;
     display: flex;
     align-items: stretch;
     width: 100%;
     height: 100%;
     z-index: 0;
 }

 #sidebar {
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     width: 15%;
     height: 100%;
     background: linear-gradient($rps-main-secondary, $rps-main-primary);
     text-align: center;
     z-index: 2;
     
     #logo {
         color: $rps-sheer-white;
         padding-top: 10px;
     }
     
     #side-menu {
         display: flex;
         flex-direction: column;
         width: 100%;
         
         .link {
             color: $rps-sheer-white;
             text-decoration: none;
             padding: 8px 0;
             
             &.active {
                 color: $rps-black !important;
                 background-color: $rps-white;
             }
             
             &:hover:not(.active) {
                 color: $rps-black !important;
                 background-color: $rps-main-secondary;
             }
             
             &:visited {
                 color: $rps-sheer-white;
             }
         }
     }
     
     #avatar-menu {
         display: flex;
         flex-direction: row;
         justify-content: center;
         text-align: center;
         padding-bottom: 25px;
         position: relative;
         
         #avatar-popout {
             display: flex;
             flex-direction: column;
             justify-content: stretch;
             color: $rps-white;
             background-color: $rps-black;
             border-radius: 10px;
             position: absolute;
             left: 80%;
             top: -100%;
             padding: 10px;
             text-align: left;
             box-shadow: 5px 5px 10px $rps-black;
             z-index: 4;
             
             .popout-item {
                 padding: 5px 0;
                 transition: color 0.5s;
                 cursor: pointer;
                 
                 &:hover:not(:first-child) {
                     color: rgba($rps-white, 0.5);
                 }
             }
             
             hr {
                 width: 100%;
             }
         }
         
         #avatar-button {
             border-radius: 100px;
             border: 5px solid $rps-main-secondary;
             overflow: hidden;
             width: 50px;
             height: 50px;
             transition: border-color 0.5s;
             
             &:hover {
                 border-color: $rps-white;
                 .avatar {
                     transform: scale(1.25);
                 }
             }
             
             .avatar {
                 width: 100%;
                 height: 100%;
                 object-fit: cover;
                 transition: transform 0.5s ease-in-out;
             }
         }
     }
 }

 #main-view {
     display: flex;
     flex-direction: column;
     width: 85%;
     height: 100%;
     padding: 10px;
     justify-content: space-between;
     overflow: hidden;
     z-index: 1;
     
     #accent-text {
         position: absolute;
         bottom: 32px;
         left: 14%;
         font-size: 192px;
         color: $rps-main-secondary;
         opacity: 0.2;
         z-index: 1;
     }
 }
</style>
