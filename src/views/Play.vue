<template>
    <article id="play">
        <Match v-if="activeMatches && activeMatches.length" :id="0" />
        <span class="serif italic" v-else>
            <span class="bold">No active matches. </span>
            <span class="link" @click="createMatch()">Create match?</span>
        </span>
    </article>
</template>

<script>
 import Match from '@/components/Match.vue';
 import { mapState } from 'vuex';
 import * as types from '@/store/mutation-types';
 
 export default {
     name: "Play",
     computed: {
         ...mapState({
             activeMatches: ({ bracketStore }) => bracketStore.activeMatches
         })
     },
     beforeRouteEnter (to, from, next) {
         next(vm => vm.$store.dispatch(types.GET_ACTIVE_MATCHES));
     },
     methods: {
         createMatch() {
             const player1Id = Math.floor(Math.random() * 8) + 1
             let player2Id = player1Id;
             while (player1Id === player2Id) player2Id = Math.floor(Math.random() * 8) + 1;
             
             this.$store.dispatch(types.CREATE_MATCH, { player1Id, player2Id });
         }
     },
     components: {
         Match
     }
 };
</script>

<style lang="scss">
 #play {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     width: 100%;
     height: 100%;
     padding: 0 10px 10px;
 }

.link {
    text-decoration: underline;
}
</style>
