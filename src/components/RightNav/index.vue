<template>
  <div
    class="right-nav-container"
    v-bind:class="sizeClass"
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
import { Getter,Action } from 'vuex-class';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { VideoInfo,VideoType } from '../../types';

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
  @Getter('Dimension/classNameTwo') sizeClass!: string;

  // methods
  @Action('DOMHome/mouseEnterRightNav')
  mouseEnter!: void;
  @Action('DOMHome/mouseLeaveRightNav')
  mouseLeave!: void;

  onScroll (): void {
    let scroll = window.scrollY;
    if (this.sizeClass === 'large') {
      if (scroll >= 460 && this.showOnAir) {
        this.showOnAir = false;
      } else if (scroll < 460 && !this.showOnAir) {
        this.showOnAir = true;
      }
    } else {
      if (scroll >= 250 && this.showOnAir) {
        this.showOnAir = false;
      } else if (scroll < 250 && !this.showOnAir) {
        this.showOnAir = true;
      }
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
.right-nav-container.medium {
  background: url(/static/right_side_bg1.png) repeat-y;
  width: 320px;
}
.right-nav-container.large {
  background: url(/static/right_side_bg.png) repeat-y;
  width: 420px;
}
.right-nav-container {
  display: inline-block;
  position: fixed;
  right:0;
  top: 71px;
  z-index:20;
  height: 100%;
  min-height: 100%;
}
</style>
