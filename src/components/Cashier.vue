<template>
    <section id="cashier">
        <section class="panel">
            <span class="value bold serif">
                <input class="mbtc-counter bold" type="number" min="0" v-model="value" />
                µBTC @ ${{ (conversionRate / 100).toFixed(2) }}
                <span class="gray">→ </span>
                <span class="positive">${{ ((currentBalance + (value * conversionRate))  / 100).toFixed(2) }}</span>
            </span>
            <button class="btn-positive serif bold" @click="addToBalance()">ADD TO BALANCE</button>
        </section>
        <section class="panel">
            <span class="small value serif negative">
                This will set your current balance to 0 and you won't
                be able to place any more bets until you re-fund your
                account.
            </span>
            <button class="btn-negative serif bold" @click="cashOut()">CASH OUT</button>
        </section>
    </section>
</template>

<script>
 import { mapState } from 'vuex';
 import * as types from '@/store/mutation-types';
 
 export default {
     name: 'Cashier',
     data() {
         return {
             conversionRate: 941.52,
             value: 0
         };
     },
     computed: {
         ...mapState({
             currentBalance: ({ currentUser }) => currentUser.currentBalance
         })
     },
     methods: {
         addToBalance() {
             if (!this.value) return;
             this.$store.dispatch(types.SET_CURRENT_BALANCE, {
                 currentBalance: this.currentBalance + (this.value * this.conversionRate)
             });
         },
         cashOut() {
             if (!this.currentBalance) return;
             this.$store.dispatch(types.SET_CURRENT_BALANCE, { currentBalance: 0 });
         }
     }
 }
</script>

<style lang="scss">
 #cashier {
     width: 100%;
     display: flex;
     
     .panel {
         display: flex;
         border: 2px solid $rps-black;
         flex-direction: column;
         background-color: $rps-sheer-white;
         box-shadow: 5px 3px 5px rgba($rps-black, 0.3);
         text-align: center;
         flex-grow: 2;
         max-width: 50%;
         margin: 0 5px 30px;
         justify-content: space-between;
         
         .text {
             background-color: $rps-accent-secondary;
             padding: 10px;
         }
         
         .value {
             color: $rps-main-primary;
             font-size: 32px;
             padding: 20px;
         }

         .small {
             font-size: 18px;
         }

         button {
             border: none;
             padding: 8px;
             border-top: 2px solid $rps-black;
             outline: none;
             font-size: 16px;
             cursor: pointer;
         }
     }

     .mbtc-counter {
         border: none;
         border-bottom: 2px solid $rps-main-primary;
         font-size: inherit;
         font-family: inherit;
         outline: none;
         max-width: 100px;
         color: inherit;
         text-align: right;
     }
 }
</style>
