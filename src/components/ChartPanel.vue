<template>
    <section class="chart-panel">
        <span class="header bold serif" v-once>{{ headerText }}</span>
        <section class="chart-content">
            <BarChart :chartdata="chartData" :chartOptions="chartOptions" />
        </section>
    </section>
</template>

<script>
 import BarChart from '@/components/BarChart.vue';
 
 export default {
     name: 'ChartPanel',
     computed: {
         colors() {
             return ['#9f84bd', '#d4c1ec'];
         }
     },
     props: {
         headerText: String,
         chartData: Object,
         chartOptions: Object
     },
     components: {
         BarChart
     }
 }
</script>

<style scoped lang="scss">
 .chart-panel {
     display: flex;
     border: 2px solid $rps-black;
     flex-direction: column;
     background-color: $rps-sheer-white;
     box-shadow: 5px 3px 5px rgba($rps-black, 0.3);
     min-width: 25%;
     flex-grow: 2;
     margin: 5px;
     height: 100%;
     
     .header {
         background-color: $rps-main-secondary;
         border-right: 2px solid $rps-black;
         border-bottom: 2px solid $rps-black;
         border-radius: 0px 0px 25px 0px / 0px 0px 25px 0px;
         padding: 10px;
         margin-bottom: 10px;
         width: 25%;
     }
     
     .chart-content {
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         padding: 10px;
         flex-grow: 1;
     }
 }
</style>
