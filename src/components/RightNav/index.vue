<template>
  <div
    class="right-nav-container"
    v-bind:class="sizeClass"
  >
    <div
      class="onair-slider"
      v-bind:key="'onair'"
      v-bind:class="{'slide-out':!showOnAir, 'slide-in':showOnAir}"
    >
      <OnAir />
    </div>
    <div
      class="trailer-slider"
      v-bind:key="'trailer'"
      v-bind:class="{'slide-in':!showOnAir, 'slide-out':showOnAir}"
    >
      <LiveTrailer />
    </div>
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
import LiveTrailer from './Trailer.vue';
// ts variable

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

.onair-slider,
.trailer-slider {
  height: 100vh;
  overflow:hidden;
  transition: transform 0.5s;
}

.onair-slider.slide-in,
.trailer-slider.slide-out {
  transform: translateY(0);
}
.onair-slider.slide-out {
  transform: translateY(-100%);
}
.trailer-slider.slide-in {
  transform: translateY(-100%);
}

// animation
// .slide-enter-active {
//   transition: all 0.5s ease;
// }
// .slide-leave-active {
//   transition: all 0.5s ease;
// }
// .onair-slider.slide-enter {
//   transform: translateY(-100%);
// }
// .onair-slider.slide-leave-to {
//   transform: translateY(-100%);
// }
// .trailer-slider.slide-enter-to {
//   transform: translateY(-100%);
// }
// .trailer-slider.slide-leave-to {
//   transform: translateY(100%);
// }
</style>
