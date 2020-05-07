<template>
    <section id="dashboard">
        <LargePanel headerText="Active Matches" :entries="matchSummaries" />
        <LargePanel headerText="Log" :entries="logs" />
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
 import LargePanel from '@/components/LargePanel.vue';
 import store from '@/store/index';
 import { mapState } from 'vuex';

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
             },
             logs: ({ homeStore }) => homeStore.logs
         })
     },
     components: {
         LargePanel
     }
 };
</script>
