<template>
    <article id="bet">
        <div class="bet-control serif">
            <button class="minus-button" @click="decreaseBetAmount()">-</button>
            <span class="bet-amount positive">$ {{ (betAmount / 100).toFixed(2) }}</span>
            <button class="plus-button" @click="increaseBetAmount()">+</button>
        </div>
        <button class="place-bet serif" @click="placeBet()">PLACE BET</button>
    </article>
</template>

<script>
 import * as types from '@/store/mutation-types';
 
 export default {
     name: "Bet",
     data() {
         return {
             betAmount: 50,
             increment: 50
         };
     },
     methods: {
         updateBetAmount(increment) {
             const { currentBalance } = this.$store.state.currentUser;
             if (this.betAmount + increment > currentBalance) return this.betAmount = currentBalance;
             if (this.betAmount + increment < 0) return this.betAmount = 0;
             this.betAmount += increment;
         },
         increaseBetAmount() { this.updateBetAmount(this.increment); },
         decreaseBetAmount() { this.updateBetAmount(-this.increment); },
         placeBet() {
             this.$store.dispatch(types.PLACE_BET, { betAmount: this.betAmount });
         }
     }
 };
</script>

<style lang="scss">
 #bet {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     height: 100%;
     width: 100%;
     
     .bet-control {
         display: flex;
         flex-direction: row;
         justify-content: space-around;
         width: 100%;

         .bet-amount {
             font-style: italic;
             font-size: 72px;
         }
         
         button {
             font-size: 72px;
             line-height: 72px;
             border: 1px solid $rps-black;
             width: 100px;
             height: 100px;
             border-radius: 50px;
             outline: none;
             box-shadow: 5px 3px 5px rgba($rps-black, 0.3);
         }
     }
     .place-bet {
         margin-top: 20px;
         font-size: 36px;
         line-height: 72px;
         border: 1px solid $rps-black;
         background-color: $rps-accent-secondary;
         width: 50%;
         outline: none;
         box-shadow: 5px 3px 5px rgba($rps-black, 0.3);
     }
 }
</style>
