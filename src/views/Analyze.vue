
<template>
    <section id="matches">
        <LargePanel
            headerText="Top Win Percentages"
            listType="horizontal"
            :entries="winPercentages" />
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
     width: 100%;
 }
</style>

<script>
 import LargePanel from '@/components/LargePanel.vue';
 import ChartPanel from '@/components/ChartPanel.vue';
 import * as types from '@/store/mutation-types';
 import { mapState } from 'vuex';

 export default {
     name: "Matches",
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
             winPercentages: ({ bracketStore }) => {
                 return bracketStore.winPercentages.map(({ username, winPercentage }, id) => {
                     return {
                         id,
                         icon: 'pie-chart-outline',
                         text: `${username}: ${winPercentage.toFixed(2)}%`
                     };
                 });
             }
         })
     },
     mounted() {
         this.$store.dispatch(types.GET_MATCH_HISTORIES);
     },
     components: {
         LargePanel,
         ChartPanel
     }
 };
</script>
