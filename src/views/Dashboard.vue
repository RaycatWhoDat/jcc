<template>
    <section id="home">
        <section id="at-a-glance">
            <SmallPanel headerText="Current Balance" :panelType="currentBalance.panelType" :value="currentBalance.value" />
            <SmallPanel headerText="Number Of Matches Entered" :panelType="matchesEntered.panelType" :value="matchesEntered.value" />
            <SmallPanel headerText="Number Of Matches Won" :panelType="matchesWon.panelType" :value="matchesWon.value" />
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
             currentBalance: ({ appStore }) => appStore.currentBalance,
             matchesEntered: ({ appStore }) => appStore.matchesEntered,
             matchesWon: ({ appStore }) => appStore.matchesWon
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
       
