<template>
  <v-toolbar>
    <v-toolbar-title>List Your Activity</v-toolbar-title>
    <v-spacer></v-spacer>
      <v-btn flat @click="homeRoute()">Home</v-btn>
      <v-btn flat @click="aboutRoute()">About</v-btn>
      <div v-if="isLogin">
        <Logout @logout="handleIsLogin"/>
      </div>
      <div v-else>
        <Login @login="handleIsLogin"/>
      </div>
  </v-toolbar>
</template>

<script>
import Login from '@/components/Login.vue'
import Logout from '@/components/Logout.vue'

export default {
  components:{
    Login,
    Logout
  },
  created () {
    this.cekLocalStorage()
  },
  data(){
    return{
      isLogin : false
    }
  },
  methods:{
    aboutRoute(){
      this.$router.push('/about')
    },
    homeRoute(){
      this.$router.push('/first')
    },
    handleIsLogin (e) {
      console.log('masuk sini', e);
      this.isLogin = e
    },
    cekLocalStorage(){
      if(localStorage.getItem('token')){
        this.status = true
      }else{
        this.status =false
      }
    },
    cekToken(){
      if(localStorage.getItem('token')){
        this.isLogin =  true
      }else{
        this.isLogin = false
      }
    }
  },
  created(){
    this.cekToken()
  }
}
</script>

<style lang="css">
</style>
