<template>
  <main class="login">
    ajhdg
    <router-link to="/beranda">Login</router-link>
  </main>
</template>

<script>
  export default {
    name: 'Login',
    created(){
      this.$http.get("uy")
      .then((result) => {
        // alert(result)
      }).catch((err) => {
        
      });
    }
  }
</script>

<style lang="scss" scoped>
  .login{
    background: none;
    box-shadow: none;
  }
</style>