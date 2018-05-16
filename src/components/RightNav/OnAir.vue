<template>
  <div
    class = 'live-list-container'
    v-bind:style="{top:scrollDistance+'px'}"
    ref="onAirList"
    @mousewheel.prevent="scrollEvent"
  >
    <div 
      class = 'live-counter-border'
      v-bind:class="sizeClass"
    >
    </div>
    <div
      class = 'live-list-title'
      v-bind:class="sizeClass"
    >
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
import { VideoInfo,VideoType } from '../../types';
import { Getter,Action } from 'vuex-class';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import Vue from 'vue';
import Card from './Card.vue';

@Component({
  components: {
    Card
  }
})
export default class OnAir extends Vue {
  // type
  scrollDistance: number = 0;
  $refs!: {
    onAirList: HTMLElement;
  }
  // data
  // computed
  @Getter('Video/liveList') lives!: VideoInfo[];
  @Getter('Video/recordList') records!: VideoInfo[];
  @Getter('Video/selectedIdx') selectedIdx!: number;
  @Getter('Dimension/classNameTwo') sizeClass!: string;
  @Getter('Video/selectedType') selectedType!: VideoType;

  get liveCount (): number {
    return this.lives.filter((x: VideoInfo) => x.type === VideoType.live).length;
  }
  get sortedLiveInfos (): VideoInfo[] {
    return [...this.lives, ...this.records];
  }
  get activeTab (): number {
    return this.getActiveTabFromSelect(this.selectedIdx, this.selectedType);
  }

  // methods
  @Action('Video/selectVideo')
  dispatchSelect!: any;
  get maxScrollDistance (): number {
    let maxDist = 22 + 15 + 20; // from title
    maxDist += 80+21+21+1; // from active tab
    maxDist += (80+15+15+1) * (this.lives.length + this.records.length - 1);// from the rest
    maxDist += 71; // from top nav
    maxDist -= window.innerHeight; // minus window height
    return maxDist;
  }

  doSelect (active: number) {
    this.dispatchSelect(this.getSelectFromActiveTab(active));
  }
  getActiveTabFromSelect (idx: number, type: VideoType): number {
    if (type === VideoType.record) {
      return idx + this.lives.length;
    } else {
      return idx;
    }
  }
  getSelectFromActiveTab (active: number): any {
    if (active >= this.lives.length) {
      return {
        idx: active - this.lives.length,
        type: VideoType.record
      };
    } else {
      return {
        idx: active,
        type: VideoType.live
      };
    }
  }
  scrollEvent (e: WheelEvent): void {
    let tempScrollDist = this.scrollDistance - e.deltaY;
    if (tempScrollDist > 0){
      tempScrollDist = 0;
      console.log('top');
    } else if (tempScrollDist < -this.maxScrollDistance){
      tempScrollDist = -this.maxScrollDistance;
      console.log('bottom');
    }
    this.scrollDistance = tempScrollDist;
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
    top: 0px;
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
}
.live-counter-border.medium {
  left: 35px;
}
.live-counter-border.large {
  left: 40px;
}
.live-counter-border {
  width: 41px;
  height: 29px;
  background: url(/static/num_bg.png) left center no-repeat;
  position: absolute;
  top: -3px;
}
.live-list-title.medium {
  margin: 15px 0 15px 35px;
}
.live-list-title.large {
  margin: 15px 0 20px 40px;
}
.live-list-title {
  font-family: "Microsoft Yahei";
  color: #f0f0f0;
  font-size: @font-large;
  position: relative;
  overflow: hidden;
  height: 22px;
  line-height: 1;

  .live-list-counter-anime {
    animation: slide-in-from-top 0.5s;
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
