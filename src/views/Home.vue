<template>
    <section id="dashboard">
        <Cashier />
        <LargePanel headerText="Active Matches" :entries="matchSummaries" />
    </section>
</template>

<style lang="scss">
 #dashboard {
     display: flex;
     flex-direction: column;
     justify-content: space-around;
     padding: 10px;
     flex-grow: 1;
     
     #sub-area {
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         flex-grow: 2;
     }
 }
</style>

<script>
 import Cashier from '@/components/Cashier.vue';
 import LargePanel from '@/components/LargePanel.vue';
 import store from '@/store/index';
 import { mapState } from 'vuex';
 import * as types from '@/store/mutation-types';

 export default {
     name: "Dashboard",
     store,
     computed: {
         ...mapState({
             matchSummaries: ({ bracketStore }) => {
                 return bracketStore.matchSummaries.map(([id, player1, player2]) => {
                     return {
                         id,
                         text: `${player1} vs. ${player2}`,
                         icon: "trophy-outline"
                     };
                 });
             }
         })
     },
     components: {
         Cashier,
         LargePanel
     },
     beforeRouteEnter (to, from, next) {
         next(vm => vm.$store.dispatch(types.GET_ACTIVE_MATCHES));
     }
 };
</script>
