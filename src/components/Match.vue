<template>
    <article class="match-area">
        <div class="buttons">
            <button
                @click="selectMove(1, 1)"
                :class="{ 'rock': true, 'selected': player1Selection === 1 }">
                <img alt="Rock" src="@/assets/rock-icon-grey.png"/>
            </button>
            <button
                @click="selectMove(1, 2)"
                :class="{ 'paper': true, 'selected': player1Selection === 2 }">
                <img alt="Paper" src="@/assets/paper-icon-grey.png"/>
            </button>
            <button
                @click="selectMove(1, 3)"
                :class="{ 'scissors': true, 'selected': player1Selection === 3 }">
                <img alt="Scissors" src="@/assets/scissors-icon-grey.png"/>
            </button>
        </div>
        <div class="match-info serif">
            <span :class="{ 'player-one-score': true, 'negative': player1Victories >= 2 }">{{ player1Victories }}</span>
            <span :class="{'player-one bold': true, 'gray': player2Victories > 2 }">
                <ion-icon v-if="player1Victories > 2" name="trophy-outline"></ion-icon>
                {{ player1Username ? player1Username.toUpperCase() : '' }}
            </span>
            <span class="versus italic">vs.</span>
            <span :class="{'player-two bold': true, 'gray': player1Victories > 2 }">
                <ion-icon v-if="player2Victories > 2" name="trophy-outline"></ion-icon>
                {{ player2Username ? player2Username.toUpperCase() : '' }}</span>
            <span :class="{ 'player-two-score': true, 'negative': player2Victories >= 2 }">{{ player2Victories }}</span>
        </div>
        <div class="buttons">
            <button
                @click="selectMove(2, 1)"
                :class="{ 'rock': true, 'selected': player2Selection === 1 }">
                <img alt="Rock" src="@/assets/rock-icon-grey.png"/>
            </button>
            <button
                @click="selectMove(2, 2)"
                :class="{ 'paper': true, 'selected': player2Selection === 2 }">
                <img alt="Paper" src="@/assets/paper-icon-grey.png"/>
            </button>
            <button
                @click="selectMove(2, 3)"
                :class="{ 'scissors': true, 'selected': player2Selection === 3 }">
                <img alt="Scissors" src="@/assets/scissors-icon-grey.png"/>
            </button>
        </div>
    </article>
</template>

<script>
 import { mapState } from 'vuex';
 import * as types from '@/store/mutation-types';
 
 export default {
     name: "Match",
     props: ['id'],
     data() {
         return {
             player1Selection: 0,
             player2Selection: 0
         }
     },
     computed: {
         winningUsername() {
             if (this.player1Victories >= 3) return this.player1Username;
             if (this.player2Victories >= 3) return this.player2Username;
             return '';
         },
         ...mapState({
             matchId: function ({ bracketStore }) {
                 return (bracketStore.activeMatches[this.id] || {}).matchId;
             },
             matchFinished: function ({ bracketStore }) {
                 return (bracketStore.activeMatches[this.id] || {}).matchFinished;
             },
             player1Victories: function ({ bracketStore }) {
                 return (bracketStore.activeMatches[this.id] || {}).player1Victories;
             },
             player1UserId: function ({ bracketStore }) {
                 return (bracketStore.activeMatches[this.id] || {}).player1Id;
             },
             player1Username: function ({ bracketStore }) {
                 return (bracketStore.activeMatches[this.id] || {}).player1Username;
             },
             player2Victories: function ({ bracketStore }) {
                 return (bracketStore.activeMatches[this.id] || {}).player2Victories;
             },
             player2UserId: function ({ bracketStore }) {
                 return (bracketStore.activeMatches[this.id] || {}).player2Id;
             },
             player2Username: function ({ bracketStore }) {
                 return (bracketStore.activeMatches[this.id] || {}).player2Username;
             }
         })
     },
     methods: {
         selectMove(playerId, move) {
             if (this.matchFinished) return;

             this[`player${playerId}Selection`] = move;
             if (this.player1Selection && this.player2Selection) this.determineWinner();
         },
         determineWinner() {
             const winState = (this.player1Selection - this.player2Selection + 1) % 3 - 1;
             this.player1Selection = 0;
             this.player2Selection = 0;

             if (!winState) return;

             const playerId = winState === 1 ? 1 : 2;
             const payload = {
                 gameId: this.id,
                 matchId: this.matchId,
                 userId: this[`player${playerId}UserId`],
                 otherUserId: this[`player${ playerId === 1 ? '2' : '1' }UserId`],
                 playerId
             }
             
             this.$store.dispatch(types.ADD_VICTORY_TO_PLAYER, payload);
         }
     }
 };
</script>

<style lang="scss">
 .match-area {
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     align-items: center;
     height: 100%;
     width: 100%;
     padding: 10px;
 }
 
 .match-info {
     display: flex;
     flex-direction: column;
     justify-content: space-around;
     align-items: center;
     flex-grow: 1;
     padding: 0 10%;
     font-size: 24px;
     
     .player-one,
     .player-one-score,
     .player-two,
     .player-two-score {
         font-size: 36px;
     }
 }
 
 .buttons {
     display: inline-flex;
     flex-direction: row;
     justify-content: space-between;
     width: 100%;
     
     button {
         display: inline-flex;
         justify-content: center;
         align-items: center;
         border: none;
         outline: none;
         background-color: $rps-white;
         width: 200px;

         &:not(.selected) {
             opacity: 0.3;
         }

         &:hover {
             opacity: 1;
         }
         
         img {
             width: 100%;
             height: 100%;
         }
     }
 }
</style>
