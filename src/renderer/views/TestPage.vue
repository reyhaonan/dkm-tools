<template>
  <div>
    <h1 class="y">Test</h1>
    <button @click="test">askdjf</button>
  </div>
</template>

<script>
export default {
  methods: {
    test(){
      this.$http.get('login')
    }
  }
}
</script>
