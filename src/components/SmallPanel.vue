<template>
<section class="panel">
    <span class="text serif" v-once>{{headerText}}</span>
    <span :class="{ 'value bold serif': true, 'positive': panelType == 'currency' }">{{ value }}</span>
</section>
</template>

<script>
 export default {
     name: 'SmallPanel',
     props: {
         headerText: String,
         value: String,
         panelType: String
     }
 }
</script>

<style scoped lang="scss">
.panel {
    display: flex;
    border: 2px solid $rps-black;
    flex-direction: column;
    background-color: $rps-sheer-white;
    box-shadow: 5px 3px 5px rgba($rps-black, 0.3);
    text-align: center;
    flex-grow: 2;
    margin: 5px;
    
    .text {
        background-color: $rps-main-secondary;
        padding: 10px;
    }
    
    .value {
        color: $rps-main-primary;
        font-size: 32px;
        padding: 0 10px 10px 10px;
    }

    .positive {
        color: $rps-accent-primary;
    }

    .negative {
        color: $rps-red;
    }
    
}
</style>
