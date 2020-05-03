<template>
<section class="large-panel">
    <span class="header bold serif" v-once>{{ headerText }}</span>
    <section class="entries">
        <div class="entry" v-for="entry in entries" :key="entry.id">
            <ion-icon :name="entry.icon"></ion-icon>
            <span class="entry-text serif">{{ entry.text }}</span>
        </div>
    </section>
</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LargePanel extends Vue {
@Prop() private headerText!: string;
@Prop() private entries!: Array<{ id: number, icon: string, text: string }>;
}
</script>

<style scoped lang="scss">
.large-panel {
    display: flex;
    border: 2px solid $rps-black;
    flex-direction: column;
    background-color: $rps-white;
    box-shadow: 5px 3px 5px rgba($rps-black, 0.3);
    min-width: 25%;
    flex-grow: 2;
    margin: 5px;
    
    .header {
        background-color: $rps-main-secondary;
        border-right: 2px solid $rps-black;
        border-bottom: 2px solid $rps-black;
        border-radius: 0px 0px 25px 0px / 0px 0px 25px 0px;
        padding: 10px;
        margin-bottom: 10px;
        width: 25%;
    }
    
    .entries {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        width: 100%;
        
        .entry {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            
            .entry-text {
                width: 90%;
                padding-left: 10px;
            }
        }
    }
}
</style>
