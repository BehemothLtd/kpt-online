<template>
    <div id="app">
        <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        <router-view @authenticated="setAuthenticated"/>
    </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
        authenticated: false,
        mockAccount: {
            username: "1111",
            password: "password"
        }
    }
  },
  mounted(){
    if(!this.authenticated){
        this.$router.replace({name: "login"})
    }
  },
  methods: {
    //HelloWorld
    setAuthenticated(status){

    },
    logout(){
        
    }
  }
}
</script>

<style>
</style>
