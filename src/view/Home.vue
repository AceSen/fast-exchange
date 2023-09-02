<template>
  <div>
  <TopMenu></TopMenu>
  <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

import TopMenu from '@/components/TopMenu.vue';

export default {
    name: "Home",
    data() {
        return {
        isRouterAlive: true
        }
    },
    components: {
        TopMenu,
    },
    mounted() {
        this.$router.push('/exchange/okx')
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

</style>