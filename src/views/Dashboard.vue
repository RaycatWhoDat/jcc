
<template>
    <section id="dashboard">
        <LargePanel headerText="Log" :entries="logs" />
        <section id="sub-area">
            <LargePanel headerText="Active Brackets" :entries="brackets" />
            <ChartPanel
                headerText="Match History"
                :chartData="matchHistories"
                :chartOptions="chartOptions" />
        </section>
    </section>
</template>

<style lang="scss">
 #dashboard {
     display: flex;
     flex-direction: row;
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
 import ChartPanel from '@/components/ChartPanel.vue';
 import LargePanel from '@/components/LargePanel.vue';
 import store from '@/store/index';
 import { mapState } from 'vuex';

 export default {
     name: "Dashboard",
     store,
     computed: {
         chartOptions() {
             return {
                 responsive: true,
                 maintainAspectRatio: false,
                 scales: {
                     xAxes: [
                         {
                             ticks: {
                                 beginAtZero: true
                             },
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
             brackets: ({ homeStore }) => homeStore.brackets,
             facts: ({ homeStore }) => homeStore.facts,
             matchHistories: ({ bracketStore }) => bracketStore.matchHistories,
             logs: ({ homeStore }) => homeStore.logs
         })
     },
     components: {
         LargePanel,
         ChartPanel
     }
 };
</script>
