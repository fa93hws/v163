<template>
  <div
    class = 'main'
    v-bind:style="{width:liveMainWidth+'px'}"
  >
    <home-main-live />
    <div class = 'lower-content'>
      <div class = 'empty-element'>&nbsp;</div>
      <home-banner class = 'home-banner'/>
      <home-other-program />
    </div>
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
import LazyImg from './lazy-img.vue';
import HomeOtherProgram from './home-other-program/index.vue';

@Component({
  components: {
    HomeMainLive,
    HomeBanner,
    LazyImg,
    HomeOtherProgram
  }
})
export default class HomeMain extends Vue {
  @Getter('Dimension/liveMainWidth') liveMainWidth!: number;
}
</script>

<style lang="less">
.main {
  margin-top: 71px; // 70 from TopNav and 1 from border
  display: inline-block;
  z-index: 10;
}
.lower-content {
  background: #182231;
}
.home-banner {
  margin-top: 45px;
}
.test-image {
  width: 800px;
  height: 600px;
}
</style>
