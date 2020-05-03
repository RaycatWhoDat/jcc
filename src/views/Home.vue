<template>
<section id="dashboard">
    <section id="at-a-glance">
        <SmallPanel v-for="stat in stats" :key="stat.id" :headerText="stat.headerText" :value="stat.value" />
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

export default {
    name: "Home",
    data() {
        return {
            facts: [
                { id: 1, icon: "medal", text: "Did you know? This capstone project is pain. But it's all that remains." }
            ],
            stats: [
                { id: 1, headerText: "Current Balance", value: "$" + (Math.random() * 9999 + 1).toFixed(2) },
                { id: 2, headerText: "Number of Brackets Entered", value: Math.floor(Math.random() * 50) + 1 },
                { id: 3, headerText: "Number of Bets Won", value: Math.floor(Math.random() * 100) + 1 }
            ],
            entries: [
                { id: 1, icon: "thumbs-up-outline", text: "Item 1" },
                { id: 2, icon: "thumbs-up-outline", text: "Item 2" },
                { id: 3, icon: "thumbs-down-outline", text: "Item 3" }
            ],
            brackets: [
                { id: 1, icon: "trophy-outline", text: "The match between User 1 and User 7 is in progress." },
                { id: 2, icon: "trophy-outline", text: "The match between User 2 and User 6 is in progress." },
                { id: 3, icon: "trophy-outline", text: "The match between User 3 and User 5 is in progress." }
            ]
        };
    },
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
       
