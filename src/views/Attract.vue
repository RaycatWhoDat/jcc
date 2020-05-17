<template>
    <article id="attract" class="serif">
        <span id="title" class="bold">RPS</span>
        <span id="subtitle" class="serif">ROCK PAPER SCISSORS</span>
        <section id="login">
            <label id="username-label" class="serif">
                <span class="bold">Username:</span>
                <input id="username" type="text" v-model="username"/>
            </label>

            <label id="password-label" class="serif">
                <span class="bold">Password:</span>
                <input id="password" type="password" v-model="password"/>
            </label>
            
            <button id="submit" :class="{'disabled': !username || !password }" @click="login()">LOG IN</button>
            <span class="error-message serif italic">Welcome to Rock-Paper-Scissors!</span>
        </section>
    </article>
</template>

<script>
 import * as types from '@/store/mutation-types';

 export default {
     name: "Attract",
     data() {
         return {
             username: '',
             password: ''
         }
     },
     methods: {
         login() {
             if (!this.username || !this.password) return;
             
             const username = this.username;
             const password = btoa(this.password);
             
             console.log('Attempting: ', username, password);
             
             this.$store.dispatch(types.LOG_IN, { username, password })
         }
     }
 };
</script>

<style lang="scss">
 #main-view {
     width: 100%;
     height: 100%;
     flex-grow: 1;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
 }

 #attract {
     width: 50%;
     height: 100%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     
     #title {
         font-size: 92px;
     }

     #subtitle {
         font-size: 32px;
         letter-spacing: 12px;
         padding-bottom: 5%;
     }

     #login {
         display: flex;
         flex-direction: column;
         width: 100%;

         #username-label,
         #password-label {
             display: flex;
             width: 100%;
             justify-content: center;
             align-items: center;
             margin-bottom: 20px;

             span {
                 min-width: 25%;
             }
             
             input {
                 border: 2px solid $rps-main-primary;
                 font-size: 24px;
                 padding: 8px;
                 outline: none;
                 background: $rps-sheer-white;
                 width: 100%;
                 font-family: 'Playfair Display', serif !important;
             }
         }
         
         button {
             border: 2px solid $rps-main-primary;
             outline: none;
             background: $rps-main-primary;
             color: $rps-white;
             box-shadow: 2px 2px 2px $rps-black;
             font-size: 24px;
             padding: 8px;
             cursor: pointer;
             font-family: 'Playfair Display', serif !important;
             
             &.disabled {
                 cursor: default;
                 border-color: $rps-gray;
             }
         }

         .error-message {
             text-align: center;
             margin-top: 30px;
         }
     }
 }
</style>

