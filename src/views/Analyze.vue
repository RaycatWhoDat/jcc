
<template>
    <section id="matches">
        <ChartPanel
            headerText="Match History"
            :chartData="matchHistories"
            :chartOptions="chartOptions" />
    </section>
</template>

<style lang="scss">
 #matches {
     display: flex;
     flex-direction: column;
     padding: 10px;
     flex-grow: 1;
 }
</style>

<script>
 import ChartPanel from '@/components/ChartPanel.vue';
 import store from '@/store/index';
 import * as types from '@/store/mutation-types';
 import { mapState } from 'vuex';

 export default {
     name: "Matches",
     store,
     computed: {
         chartOptions() {
             return {
                 responsive: true,
                 maintainAspectRatio: false,
                 scales: {
                     xAxes: [
                         {
                             stacked: true
                         }
                     ],
                     yAxes: [
                         {
                             ticks: {
                                 beginAtZero: true
                             },
                         }
                     ]
                 }
             };
         },
         ...mapState({
             matchHistories: ({ bracketStore }) => bracketStore.matchHistories,
         })
     },
     mounted() {
        this.$store.dispatch(types.GET_MATCH_HISTORIES);
     },
     components: {
         ChartPanel
     }
 };
</script>
