<template>
  <div class = 'home'>
    <HomeMain />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

import HomeMain from '../containers/HomeMain.vue';

@Component({
  components: {
    HomeMain
  }
})
export default class Home extends Vue {

}
</script>

<style lang='less' scoped>
</style>
