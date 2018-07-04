<template>
  <div>
    <v-btn color="primary" dark @click="logout()">Logout</v-btn>
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
      localStorage.clear()
      this.$emit('logout', false)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
</style>
