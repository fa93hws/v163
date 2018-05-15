<template>
  <div
    class="right-nav-container"
    v-bind:style="{width: navWidth + 'px'}"
  >
    <OnAir
      v-if="showOnAir"
    />
    <LiveTrailer
      v-else
    />
  </div>
</template>

<script lang="ts">
// types
import {Getter} from 'vuex-class'
import Component from 'vue-class-component';
import {Watch} from 'vue-property-decorator';
import {VideoInfo} from '@/types';

import Vue from 'vue';
import OnAir from './OnAir.vue';
import LiveTrailer from './LiveTrailer.vue';
// fakedata
import * as fakeData from './fakedata.json';
@Component({
  components: {
    OnAir,
    LiveTrailer
  }
})
export default class RightNav extends Vue {
  // data
  showOnAir: boolean = true;
  // computed
  @Getter('Dimension/rightNavWidth') navWidth!: number;
  get sortedLives (): VideoInfo[][] {
    let raw: VideoInfo[] = (<any>fakeData);
    let onAirLive: VideoInfo[] = raw.filter((x: VideoInfo) => x.status<2)
    let trailers: VideoInfo[] = raw.filter((x: VideoInfo) => x.status==2)
    return [onAirLive, trailers];
  }

  // methods
  onScroll (): void {
    let scroll = window.scrollY;
    if (scroll >= 460 && this.showOnAir) {
      this.showOnAir = false;
    } else if (scroll < 460 && !this.showOnAir){
      this.showOnAir = true;
    }
  }

  mounted (this: RightNav) {
    window.addEventListener('scroll', this.onScroll);
  }
  descroyed () {
    window.removeEventListener('scroll', this.onScroll);
  }
}
</script>

<style lang="less" scoped>
.right-nav-container {
  display: inline-block;
  position: fixed;
  right:0;
  top: 71px;
  z-index:20;
  height: 100%;
  min-height: 100%;
  background: url(/static/right_side_bg.png) repeat-y;
}
</style>
