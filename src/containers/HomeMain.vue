<template>
  <div class = 'main'>
    <HomeMainLive />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

import HomeMainLive from './HomeMainLive.vue';

@Component({
  components: {
    HomeMainLive
  }
})
export default class HomeMain extends Vue {
}
</script>

<style lang="less">
  .main {
    margin-top: 71px; // 70 from TopNav and 1 from border
    width: 1503px;
    height: 2000px;
    background:silver;
  }
</style>
