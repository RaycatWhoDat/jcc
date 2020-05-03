<template>
<section id="dashboard">
    <section id="at-a-glance">
        <SmallPanel
            v-for="stat in stats"
            :key="stat.id"
            :headerText="stat.headerText"
            :value="stat.value"
            :panelType="stat.panelType" />
    </section>
    <section id="main-area">
        <LargePanel headerText="Log" :entries="entries" />
        <section id="sub-area">
            <LargePanel headerText="Active Brackets" :entries="brackets" />
            <LargePanel headerText="Random Fact/Put a Chart Here" :entries="facts" />
        </section>
    </section>
</section>
</template>

<script>
import SmallPanel from '@/components/SmallPanel.vue';
import LargePanel from '@/components/LargePanel.vue';
import store from '@/store/index';
import { mapState } from 'vuex';

export default {
    name: "Home",
    store,
    computed: {
        ...mapState({
            stats: ({ homeStore }) => homeStore.stats,
            brackets: ({ homeStore }) => homeStore.brackets,
            facts: ({ homeStore }) => homeStore.facts,
            entries: ({ homeStore }) => homeStore.entries,
        })},
    components: {
        SmallPanel,
        LargePanel
    }
};
</script>

<style lang="scss">
#dashboard {
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
}
</style>
       
