<template>
  <div>
    <Header/>
    <Todo/>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Todo from '@/components/TodoText.vue'

  export default{
    name: 'about',
    components:{
      Header,
      Todo,
    },
    created(){
      if(!localStorage.getItem('token')){
        this.$router.push('/')
      }
    }
  }
</script>

<style>

</style>
