<template>
    <section id="bracket">
        <section class="seed-round" v-if="activeMatches && activeMatches.length">
            <Pod v-for="(match, index) in activeMatches" :id="index" :key="match.matchId" />
        </section>
        <span class="seed-round serif bold italic" v-else>
            No active matches.
        </span>
    </section>
</template>

<style lang="scss">
 #bracket {
     width: 100%;
     height: 100%;
     display: flex;
     flex-direction: row;
     justify-content: center;
     overflow: hidden;

     .seed-round {
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         align-items: center;
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
     mounted() {
         this.$store.dispatch(types.GET_ACTIVE_MATCHES);
     }
 }
</script>
