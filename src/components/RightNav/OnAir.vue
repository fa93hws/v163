<template>
  <div
    class = 'rightnav-list-container'
    v-bind:style="{top:scrollDistance+'px'}"
    ref="onAirList"
    @mousewheel.prevent="scrollEvent"
  >
    <div 
      class = 'rightnav-counter-border'
      v-bind:class="sizeClass"
    >
    </div>
    <div
      class = 'rightnav-list-title'
      v-bind:class="sizeClass"
    >
      <div class = 'rightnav-list-counter-anime'>
        <span
          v-for="n in 6"
          v-bind:key="n"
          v-bind:class="'rightnav-list-count-'+n"
        >
          {{liveCount}}
        </span>
      </div>
      <h2>正在直播</h2>
    </div>
    <!-- live list -->
    <ul class = 'live-list'>
      <Card
        v-for="(liveInfo, index) in sortedLiveInfos"
        v-bind:key="index"
        ref="onAirCard"
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
import Card from './OnAirCard.vue';

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
    onAirCard: Vue[]
  };
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
  get maxScrollDistance (): number {
    let refs: Vue[] = this.$refs.onAirCard;
    let lastBox: ClientRect = refs[refs.length - 1].$el.getBoundingClientRect();
    return lastBox.top + lastBox.height - window.innerHeight;
  }

  // methods
  @Action('Video/selectVideo')
  dispatchSelect!: any;

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
    if (tempScrollDist > 0) {
      tempScrollDist = 0;
      console.log('top');
    } else if (tempScrollDist < -this.maxScrollDistance) {
      tempScrollDist = -this.maxScrollDistance;
      console.log('bottom');
    }
    this.scrollDistance = tempScrollDist;
  }
  // mounted
}
</script>

<style lang="less" scoped>
@import './style.less';
.live-list {
  width: 390px;
  margin-left: @margin-medium;
}

</style>
