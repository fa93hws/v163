<template>
  <div
    class = 'main'
    v-bind:style="{width:liveMainWidth+'px'}"
  >
    <HomeMainLive />
    <HomeBanner />
  </div>
</template>

<script lang="ts">
// types
import { Getter } from 'vuex-class';
import { Dimension } from '../store/Dimension';
import { Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';

import Vue from 'vue';
import HomeMainLive from './home-main-live.vue';
import HomeBanner from '../components/home-banner.vue';

@Component({
  components: {
    HomeMainLive,
    HomeBanner
  }
})
export default class HomeMain extends Vue {
  @Getter('Dimension/liveMainWidth') liveMainWidth!: number;
}
</script>

<style lang="less">
.main {
  margin-top: 71px; // 70 from TopNav and 1 from border
  height: 2000px;
  display: inline-block;
  background:silver;
  z-index: 10;
}
</style>
