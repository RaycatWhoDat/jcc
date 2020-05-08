<template>
    <article id="bet">
        <div class="betting-area" v-if="matchSummaries && matchSummaries.length">
            <div class="match-summaries serif">
                <span class="header bold">ACTIVE MATCHES</span>
                <span class="subtext italic">(Click on the username you want to win.)</span>
                <div class="match" v-for="(matchSummary, index) in matchSummaries" :key="matchSummary[0]">
                    <span class="id bold">#{{matchSummary[0]}}:</span>
                    <span
                        @click="toggleSelection(index, 1)"
                        :class="{'summary': true, 'bg-green': bets[index] === 1 }">
                        {{matchSummary[1]}}
                    </span>
                    <span
                        @click="toggleSelection(index, 2)"
                        :class="{'summary': true, 'bg-green': bets[index] === 2 }">
                        {{matchSummary[2]}}
                    </span>
                </div>
            </div>
            <div class="bet-control serif">
                <span class="bet-amount italic positive">$ {{ (betAmount / 100).toFixed(2) }}</span>
                <div class="controls">
                    <button class="minus-button" @click="decreaseBetAmount()">-</button>
                    <button class="plus-button" @click="increaseBetAmount()">+</button>
                </div>
                <button :class="{ 'place-bet serif': true, 'disabled': !totalBetAmount || totalBetAmount > currentBalance }" @click="placeBet()">PLACE BET</button>
            </div>
        </div>
        <div class="total-amount serif italic" v-if="matchSummaries && matchSummaries.length">
            <span class="bet-amount">Total Bet: 
                <span :class="{'negative': totalBetAmount > currentBalance }">
                    ${{ (totalBetAmount / 100).toFixed(2) }}
                </span>
            </span>
        </div>
        <span class="serif bold italic" v-else>
            No active matches.
        </span>
    </article>
</template>

<script>
 import Vue from 'vue';
 import * as types from '@/store/mutation-types';
 import { mapState } from 'vuex';

 const INITIAL_INCREMENT = 50;
 
 export default {
     name: "Bet",
     data() {
         return {
             bets: [],
             betAmount: 50,
             increment: INITIAL_INCREMENT
         };
     },
     computed: {
         totalBetAmount: function () {
             const betAmount = this.betAmount;
             const totalBetAmount = this.bets.reduce((_totalBetAmount, bet) => {
                 return bet ? _totalBetAmount + betAmount : _totalBetAmount
             }, 0)
             return totalBetAmount;
         },
         ...mapState({
             activeMatches: ({ bracketStore }) => bracketStore.activeMatches,
             userId: ({ currentUser }) => currentUser.userId,
             currentBalance: ({ currentUser }) => currentUser.currentBalance,
             matchSummaries: function ({ bracketStore }) {
                 this.generateBetArray(bracketStore.matchSummaries);
                 return bracketStore.matchSummaries;
             }
         })
     },
     methods: {
         generateBetArray(matchSummaries) {
             this.bets = matchSummaries.map(() => 0);
         },
         updateBetAmount(increment) {
             const { currentBalance } = this.$store.state.currentUser;
             if (this.betAmount + increment > currentBalance) return this.betAmount = currentBalance;
             if (this.betAmount + increment < INITIAL_INCREMENT) return this.betAmount = INITIAL_INCREMENT;
             this.betAmount += increment;
         },
         increaseBetAmount() {
             this.updateBetAmount(this.increment);
         },
         decreaseBetAmount() {
             this.updateBetAmount(-this.increment);
         },
         placeBet() {
             if (!this.totalBetAmount || this.totalBetAmount > this.currentBalance) return;

             const bettingUserId = this.userId;
             const betAmount = this.betAmount;
             
             this.bets.forEach((playerId, index) => {
                 if (!playerId) return;
                 const matchId = this.matchSummaries[index][0]
                 const matchInfo = this.activeMatches.find(match => match.matchId === matchId) || {};
                 const winningUsername = matchInfo[`player${playerId}Username`];
                 const winningUserId = matchInfo[`player${playerId}Id`];

                 this.$store.dispatch(types.PLACE_BET, {
                     matchId,
                     userInfo: { winningUsername, winningUserId, bettingUserId },
                     betAmount,
                     currentBalance: this.currentBalance - this.totalBetAmount
                 });
             });

             this.generateBetArray(this.matchSummaries);
         },
         toggleSelection(index, playerId) {
             if (!this.bets) return;
             Vue.set(this.bets, index, this.bets[index] !== playerId ? playerId : 0);
         } 
     },
     beforeRouteEnter (to, from, next) {
         next(vm => vm.$store.dispatch(types.GET_ACTIVE_MATCHES));
     }
 };
</script>

<style lang="scss">
 #bet {
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     height: 100%;
     width: 100%;

     .betting-area {
         display: flex;
         flex-direction: row;
         align-items: center;
         width: 100%;
         
         .match-summaries {
             display: flex;
             flex-direction: column;
             justify-content: space-between;
             align-items: center;
             flex-grow: 1;
             padding: 30px;

             .header {
                 font-size: 36px;
             }

             .subtext {
                 padding-bottom: 20px;
             }

             .match {
                 display: inline-flex;
                 justify-content: space-between;
                 align-items: center;
                 width: 100%;

                 .summary {
                     background-color: $rps-sheer-white;
                     border-radius: 5px;
                     border: 1px solid $rps-black;
                     overflow: hidden;
                     width: 100%;
                     padding: 10px;
                     margin-left: 10px;
                     margin-bottom: 5px;
                     box-shadow: 5px 5px 5px rgba($rps-black, 0.3);
                 }
             }
         }
         
         .bet-control {
             display: flex;
             flex-direction: column;
             justify-content: space-around;
             align-items: center;
             min-width: 40%;
             padding: 30px;

             .bet-amount {
                 background: $rps-sheer-white;
                 display: inline-flex;
                 justify-content: center;
                 align-items: center;
                 font-size: 48px;
                 width: 100%;
                 border: 1px solid $rps-gray;
                 text-shadow: rgba($rps-black, 0.5) 1px 1px;
                 padding: 5px;
             }

             .controls {
                 width: 100%;
                 display: flex;
                 justify-content: space-around;
                 margin-top: 10px;
             }
             
             .minus-button,
             .plus-button {
                 font-size: 48px;
                 line-height: 48px;
                 border: 1px solid $rps-black;
                 width: 40%;
                 border-radius: 50px;
                 outline: none;
                 box-shadow: 5px 3px 5px rgba($rps-black, 0.3);
             }
             
             .place-bet {
                 margin-top: 20px;
                 font-size: 24px;
                 line-height: 48px;
                 border: 1px solid $rps-black;
                 background-color: $rps-accent-secondary;
                 width: 100%;
                 outline: none;
                 box-shadow: 5px 3px 5px rgba($rps-black, 0.3);
             }
         }
     }

     .total-amount {
         display: flex;
         justify-content: center;
         border-top: 3px solid rgba($rps-black, 0.3);
         padding: 10px 0;
         width: 100%;
         text-align: right;

         .bet-amount {
             color: $rps-gray;
             font-size: 36px;
             width: 90%;
         }
     }
 }
</style>
