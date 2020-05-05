<template>
    <section id="home">
        <section id="at-a-glance">
            <SmallPanel
                v-for="stat in stats"
                :key="stat.id"
                :headerText="stat.headerText"
                :value="stat.value"
                :panelType="stat.panelType" />
        </section>
        <section id="main-area">
            <router-view />
        </section>
    </section>
</template>

<script>
 import store from '@/store/index';
 import SmallPanel from '@/components/SmallPanel.vue';
 import { mapState } from 'vuex';

 export default {
     name: "App",
     store,
     computed: {
         ...mapState({
             stats: ({ appStore }) => appStore.stats
         })
     },
     components: {
         SmallPanel
     }
 };
</script>

<style lang="scss">
 #home {
     display: flex;
     flex-direction: column;
     width: 100%;
     height: calc(100% - 25px);
     z-index: 3;
     
     #at-a-glance {
         display: flex;
         flex-direction: row;
         justify-content: space-around;
         margin-bottom: 10px;
         padding: 10px;
     }

     #main-area {
         display: flex;
         width: 100%;
         flex-direction: row;
         justify-content: space-around;
         flex-grow: 1;
     }
 }
</style>
       
