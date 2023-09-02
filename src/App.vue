<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      isRouterAlive: true
    }
  },
  reload: function() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
