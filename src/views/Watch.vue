<template>
    <section id="brackets">
        <Bracket />
    </section>
</template>

<style lang="scss">
 #brackets {
     width: 100%;
     height: 100%;
 }
</style>

<script>
 import Bracket from '@/components/Bracket.vue';
 
 export default {
     name: 'Brackets',
     components: {
         Bracket
     }
 }
</script>
