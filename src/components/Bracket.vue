<template>
    <section id="bracket">
        <button id="create-match" @click="createMatch()">CREATE MATCH</button>
        <section id="round">
            <Pod id="0" />
            <Pod id="1" />
            <Pod id="2" />
            <Pod id="3" />
        </section>
        <section id="round">
            <Pod id="4" />
            <Pod id="5" />
        </section>
        <section id="round">
            <Pod id="6" />
        </section>
    </section>
</template>

<style lang="scss">
 #bracket {
     width: 100%;
     height: 100%;
     display: flex;
     flex-direction: row;
     overflow: hidden;

     #round {
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         padding: 0 20px;
         min-width: 10%;
         flex-grow: 1;
     }
 }
</style>

<script>
 import Pod from '@/components/Pod.vue';
 import * as types from '@/store/mutation-types';
 import { mapState } from 'vuex';
 
 export default {
     name: 'Bracket',
     computed: {
         ...mapState({
             activeMatches: ({ bracketStore }) => bracketStore.activeMatches 
         })
     },
     components: {
         Pod
     },
     methods: {
         createMatch() {
             const player1Id = Math.floor(Math.random() * 8) + 1
             let player2Id = player1Id;
             while (player1Id === player2Id) player2Id = Math.floor(Math.random() * 8) + 1;
             
             this.$store.dispatch(types.CREATE_MATCH, { player1Id, player2Id });
         }
     },
     mounted() {
         this.$store.dispatch(types.GET_ACTIVE_MATCHES);
     }
 }
</script>
