<template>
    <section id="bracket">
        <section id="round">
            <div class="players serif">
                <span class="designation">1</span>
                <div class="player gray">
                    <span class="games bold">2</span>
                    <span class="username">Jen</span>
                </div>
                <div class="player">
                    <span class="games bold bg-green">3</span>
                    <span class="username bold">Percy</span>
                </div>
            </div>
            <div class="players serif">
                <div class="player gray">
                    <span class="games bold">1</span>
                    <span class="username">Tim</span>
                </div>
                <div class="player">
                    <span class="games bold bg-green">3</span>
                    <span class="username bold">Olivia</span>
                </div>
            </div>
            <div class="players serif">
                <div class="player gray">
                    <span class="games bold">2</span>
                    <span class="username">Samantha</span>
                </div>
                <div class="player">
                    <span class="games bold bg-green">3</span>
                    <span class="username bold">James</span>
                </div>
            </div>
            <div class="players serif">
                <div class="player gray">
                    <span class="games bold">0</span>
                    <span class="username">David</span>
                </div>
                <div class="player">
                    <span class="games bold bg-green">3</span>
                    <span class="username bold">Rodney</span>
                </div>
            </div>
        </section>
        <section id="round">
            <div class="players serif">
                <div class="player gray">
                    <span class="games bold">2</span>
                    <span class="username">Percy</span>
                </div>
                <div class="player">
                    <span class="games bold bg-green">3</span>
                    <span class="username bold">Olivia</span>
                </div>
            </div>
            <div class="players serif">
                <div class="player gray">
                    <span class="games bold">1</span>
                    <span class="username">James</span>
                </div>
                <div class="player">
                    <span class="games bold bg-green">3</span>
                    <span class="username bold">Rodney</span>
                </div>
            </div>
        </section>
        <section id="round">
            <div class="players serif">
                <div class="player gray">
                    <span class="games bold">2</span>
                    <span class="username">Rodney</span>
                </div>
                <div class="player">
                    <span class="games bold bg-green">3</span>
                    <span class="username bold">Olivia</span>
                </div>
            </div>
        </section>
    </section>
</template>

<style lang="scss">
 #bracket {
     width: 100%;
     height: 100%;
     display: flex;
     flex-direction: row;
     overflow: hidden;

     #round {
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         padding: 0 20px;
         min-width: 10%;
         flex-grow: 1;

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
                     min-width: 10px;
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
     }
 }
</style>

<script>
 export default {
     name: 'Bracket'
 }
</script>
