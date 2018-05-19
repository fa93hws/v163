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
      <on-air @mousewheel="calScrollBar"/>
    </div>
    <div
      class="trailer-slider"
      v-bind:key="'trailer'"
      v-bind:class="{'slide-in':!showOnAir, 'slide-out':showOnAir}"
    >
      <live-trailer @mousewheel="calScrollBar"/>
    </div>
    <div
      class="right-nav-scroll-bar"
      v-bind:style="{top: rightNavScrollPos[showOnAir ? 0 : 1] + 'px'}"
    >
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
import OnAir from './on-air.vue';
import LiveTrailer from './trailer.vue';
// ts variable
export enum navType {
  onAir = 0,
  trailer = 1
}

@Component({
  components: {
    OnAir,
    LiveTrailer
  }
})
export default class RightNav extends Vue {
  // data
  showOnAir: boolean = true;
  rightNavScrollPos: number[] = [0,0];

  // computed
  @Getter('Dimension/classNameTwo') sizeClass!: string;
  get windowHeight (): number { return window.outerHeight; }

  onWindowScroll (): void {
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
  calScrollBar (dist: number, maxDist: number, type: navType): void {
    // scroll bar height = 130px
    // 71 at top and windowHeight - 130 at bottom
    let pos = 71 + (this.windowHeight - 130 - 71) / maxDist * Math.abs(dist);
    pos = pos < 71 ? 71 : pos;
    this.rightNavScrollPos = type === navType.onAir ?
      [pos, this.rightNavScrollPos[1]] :
      [this.rightNavScrollPos[0], pos];
  }
  @Watch('showOnAir')
  onNavToggle (): void {
    this.$emit('navChange',this.showOnAir);
  }
  mounted (this: RightNav) {
    window.addEventListener('scroll', this.onWindowScroll);
    this.calScrollBar(0,1,navType.onAir);
    this.calScrollBar(0,1,navType.trailer);
  }
  descroyed () {
    window.removeEventListener('scroll', this.onWindowScroll);
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

// scorllbar
.right-nav-scroll-bar {
  width: 10px;
  height: 130px;
  position: fixed;
  right: 0;
  background: black;
}
</style>
