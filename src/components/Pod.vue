<template>
    <div class="players serif">
        <span class="designation">1</span>
        <div :class="{ 'player': true, 'gray': player2Victories > 2 }">
            <span
                @click="addVictoryToPlayer(1)"
                :class="{ 'games bold': true, 'bg-green': player1Victories > 2 }">
                {{ player1Victories }}
            </span>
            <span :class="{ 'username': true, 'bold': player1Victories > 2 }">{{ player1Username }}</span>
        </div>
        <div :class="{ 'player': true, 'gray': player1Victories > 2 }">
            <span
                @click="addVictoryToPlayer(2)"
                :class="{ 'games bold': true, 'bg-green': player2Victories > 2 }">
                {{ player2Victories }}
            </span>
            <span :class="{ 'username': true, 'bold': player2Victories > 2 }">{{ player2Username }}</span>
        </div>
    </div>
</template>

<script>
 import * as types from '@/store/mutation-types';
 import { mapState } from 'vuex';
 
 export default {
     name: 'Pod',
     props: ['id'],
     methods: {
         addVictoryToPlayer(playerId) {
             if (this.player1Victories >= 3 || this.player2Victories >= 3) return;

             this.$store.dispatch(types.ADD_VICTORY_TO_PLAYER, {
                 gameId: this.id,
                 matchId: this.matchId,
                 userId: this[`player${playerId}UserId`],
                 otherUserId: this[`player${ playerId === 1 ? '2' : '1' }UserId`],
                 playerId
             })
         }
     },
     computed: {
         ...mapState({
             matchId: function ({ bracketStore }) {
                 return (bracketStore.activeMatches[this.id] || {}).matchId;
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
     }
 }
</script>

<style scoped lang="scss">
 .players {
     border-radius: 5px;
     border: 1px solid $rps-black;
     margin-right: 5px;
     position: relative;
     overflow: hidden;
     box-shadow: 5px 5px 5px rgba($rps-black, 0.3);

     .designation {
         position: absolute;
         left: calc(-5% - 5px);
         top: calc(50% - 12px);
     }
     
     .player {
         background-color: $rps-sheer-white;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
         
         &:last-child {
             border-top: 1px solid $rps-black;
         }
         
         .games {
             display: inline-block;
             min-width: 12px;
             line-height: 20px;
             vertical-align: middle;
             padding: 5px 10px;
             border-right: 1px solid $rps-black;
         }

         .username {
             display: inline-block;
             line-height: 20px;
             vertical-align: middle;
             padding: 5px 10px;
         }

         
     }
 }
</style>
