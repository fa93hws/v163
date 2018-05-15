<template>
  <div class = 'live-list-container'>
    <div class = 'live-counter-border'>
    </div>
    <div class = 'live-list-title'>
      <div class = 'live-list-counter-anime'>
        <span
          v-for="n in 6"
          v-bind:key="n"
          v-bind:class="'live-list-count-'+n"
        >
          {{liveCount}}
        </span>
      </div>
      <h2>正在直播</h2>
    </div>
    <ul class = 'live-list'>
      <Card
        v-for="(liveInfo, index) in sortedLiveInfos"
        v-bind:key="index"
        :info="sortedLiveInfos[index]"
        :active="activeTab==index"
        @mousedown="doSelect(index)"
      />
    </ul>
  </div>
</template>

<script lang="ts">
// type
import {VideoInfo} from '@/types';
import {Getter,Action} from 'vuex-class';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

import Vue from 'vue';
import Card from './Card.vue'

// fakedata
import * as fakeData from './fakedata.json';

@Component({
  components: {
    Card
  }
})
export default class OnAir extends Vue {
  // data
  // computed
  @Getter('Video/liveList') lives!: VideoInfo[];
  @Getter('Video/recordList') reocrds!: VideoInfo[];
  @Getter('Video/selectedIdx') selectedIdx!: number;
  @Getter('Video/selectedType') selectedType!: string;

  get liveCount (): number {
    return this.lives.filter((x: VideoInfo) => x.status==0).length;
  }
  get sortedLiveInfos (): VideoInfo[] {
    return [...this.lives, ...this.reocrds];
  }
  get activeTab(): number {
    return this.getActiveTabFromSelect(this.selectedIdx, this.selectedType);
  }

  // methods
  @Action('Video/selectVideo')
  dispatchSelect!: any;

  doSelect(active: number) {
    this.dispatchSelect(this.getSelectFromActiveTab(active));
  }
  getActiveTabFromSelect(idx: number, type: string): number {
    if (type==='record'){
      return idx - this.lives.length;
    } else {
      return idx;
    }
  }
  getSelectFromActiveTab(active: number): any {
    if (active >= this.lives.length) {
      return {
        idx: active - this.lives.length,
        typ: 'record'
      }
    } else {
      return {
        idx: active,
        typ: 'live'
      }
    }
  }
  // mounted

}
</script>

<style lang="less" scoped>
@import '../../assets/styles/variables.less';
@counter_distance: 20px;
.generate-counters(@n, @i: 1) when (@i =< @n) {
  .live-list-count-@{i} {
    position: absolute;
    top: @counter_distance - @i * @counter_distance;
    left: 0;
    width: 41px;
    height: 22px;
    display: block;
    line-height: 22px;
    text-align: center;
  }
  .generate-counters(@n, (@i + 1));
}

.live-list-container {
  position: relative;
  top: 0px;
}
.live-counter-border {
  width: 41px;
  height: 29px;
  background: url(/static/num_bg.png) left center no-repeat;
  position: absolute;
  top: -3px;
  left: 40px;
}
.live-list-title {
  font-family: "Microsoft Yahei";
  color: #f0f0f0;
  font-size: @font-large;
  margin: 15px 0 20px 40px;
  position: relative;
  overflow: hidden;
  height: 22px;
  line-height: 1;

  .live-list-counter-anime {
    animation: slide-in-from-top 0.5s;
    // transform: translateY(25px);
    // animation-name: slideInFromTop;
    // animation-duration: 4s;

    .generate-counters(6);

  } // end of live-list-counter-anime

  h2 {
    padding-left: 51px;
    font-weight: normal;
    margin-top: -2px;
  }
}
.live-list {
  width: 390px;
  margin-left: @margin-medium;
}

// animation
@keyframes slide-in-from-top {
  0% {
    transform: translateY();
  }
  100% {
    transform: translateY(@counter_distance*5);
  }
}
</style>
