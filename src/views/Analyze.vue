
<template>
    <section id="matches">
        <div class="charts">
            <LargePanel
                headerText="Top Win Percentages"
                listType="horizontal"
                :entries="winPercentages" />
            <LargePanel
                headerText="Top Loss Percentages"
                listType="horizontal"
                :entries="lossPercentages" />
        </div>
        <div class="charts">
            <ChartPanel
                headerText="Matches Entered"
                :chartData="matchesEnteredData"
                :chartOptions="chartOptions" />
            <ChartPanel
                headerText="Matches Won"
                :chartData="matchesWonData"
                :chartOptions="chartOptions" />
            <ChartPanel
                headerText="Matches Lost"
                :chartData="matchesLostData"
                :chartOptions="chartOptions" />
        </div>
    </section>
</template>

<style lang="scss">
 #matches {
     display: flex;
     flex-direction: column;
     padding: 10px;
     flex-grow: 1;
     width: 100%;

     .charts {
         display: flex;
         flex-grow: 1;
         flex-direction: row;
     }
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
             matchesEnteredData: ({ bracketStore }) => bracketStore.matchesEnteredData,
             matchesWonData: ({ bracketStore }) => bracketStore.matchesWonData,
             matchesLostData: ({ bracketStore }) => bracketStore.matchesLostData,
             winPercentages: ({ bracketStore }) => {
                 return bracketStore.winPercentages.map(({ username, percentage }, id) => {
                     const fixedPercentage = (percentage * 100).toFixed(2);
                     return {
                         id,
                         icon: 'pie-chart-outline',
                         text: `${username}: ${fixedPercentage}%`
                     };
                 });
             },
             lossPercentages: ({ bracketStore }) => {
                 return bracketStore.lossPercentages.map(({ username, percentage }, id) => {
                     const fixedPercentage = ((1 - percentage) * 100).toFixed(2);
                     return {
                         id,
                         icon: 'pie-chart-outline',
                         text: `${username}: ${fixedPercentage}%`
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
