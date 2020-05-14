<template>
  <div>
    <h1>Login form</h1>
    <input type="text" name="username" v-model="input.username" placeholder="Username"/>
    <input type="text" name="password" v-model="input.password" placeholder="Password"/>
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data(){
      return {
          input: {
            username: "",
            password: ""
          }
      }
    },
    methods: {
      login(){
        if(this.input.username != "" && this.input.password != ""){
          if(this.input.username == this.$parent.mockAccount && this.input.password == this.$parent.mockAccount.password){
            this.$emit("authenticated",true)
            this.$router.replace({name: "secure"});
          }else{
            console.log("...")
          }
        }else{
          console.log("username and password must be present")
        }
      }
    }
  }
</script>