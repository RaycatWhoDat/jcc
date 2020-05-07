<template>
    <section id="dashboard">
        <LargePanel headerText="Log" :entries="logs" />
        <LargePanel headerText="Active Brackets" :entries="brackets" />
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
 import LargePanel from '@/components/LargePanel.vue';
 import store from '@/store/index';
 import { mapState } from 'vuex';

 export default {
     name: "Dashboard",
     store,
     computed: {
         ...mapState({
             brackets: ({ homeStore }) => homeStore.brackets,
             logs: ({ homeStore }) => homeStore.logs
         })
     },
     components: {
         LargePanel
     }
 };
</script>
