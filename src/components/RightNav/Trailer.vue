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
    <!-- title -->
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
          {{trailerCount}}
        </span>
      </div>
      <h2>直播预告</h2>
    </div>
    <!-- end of title -->
    <!-- list  -->
    <div class = 'trailer-list-container'>
      <div
        v-for="(trailerInADay, idxOut) in allTrailers"
        v-bind:key="idxOut"
        class = 'trailer-list-byday-container'
      >
        <h2
          class = 'trailer-list-byday-title'
        >
        {{ getDayDescription(trailerInADay[0]) }}
        </h2>
        <ul
          class = 'trailer-list-byday-card'
        >
          <Card
            v-for="(trailerInfo, idxIn) in trailerInADay"
            v-bind:key = idxIn
            :trailerInfo="trailerInfo"
            ref="trailerCards"
          >
          </Card>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// type
import { VideoInfo,TrailerInfo } from '../../types';
import { Prop } from 'vue-property-decorator';
import { Getter,Action } from 'vuex-class';
import Component from 'vue-class-component';

import Vue from 'vue';
import moment from 'moment';
import Card from './TrailerCard';

@Component({
  components:{
    Card
  }
})
export default class LiveTrailer extends Vue {
  $refs!: {
    trailerCards: Vue[];
  }
  // data
  scrollDistance: number = 0;
  // computed
  @Getter('Video/trailerList') sortedList!: TrailerInfo[];
  @Getter('Video/trailerIdxByDay') trailerIdxByDay!: number[];
  @Getter('Dimension/classNameTwo') sizeClass!: string;
  get trailerCount (): number {
    return this.sortedList.length;
  }
  get allTrailers (): TrailerInfo[][] {
    let idxs: number[] = [...this.trailerIdxByDay.filter((nouse: number,index: number) => index > 0), this.trailerCount];
    var lastIdx: number = 0; // only used for the next mapping
    let trailers: TrailerInfo[][] = idxs.map((idx:number) => {
      let temp: TrailerInfo[] = this.sortedList.slice(lastIdx,idx);
      lastIdx = idx;
      return temp;
    });
    return trailers;
  } // trailers
  get maxScrollDistance (): number {
    let refs: Vue[] = this.$refs.trailerCards;
    let lastBox: ClientRect = refs[refs.length-1].$el.getBoundingClientRect();
    return lastBox.top + lastBox.height - window.innerHeight;
  }
  // method
  getDayDescription (trailer: TrailerInfo): string {
    let today: moment.Moment = moment('2018-05-22','YYYY-MM-DD');
    if (trailer.timeOnAir.isSame(today, 'day')) {
      return '今天';
    } else if (trailer.timeOnAir.diff(today,'days') === 1) {
      return '明天';
    } else {
      return trailer.timeOnAir.format('MM/DD');
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
}
</script>

<style lang="less" scoped>
@import './style.less';
.trailer-list-container {
  position: relative;
  top: 0px;
  margin: 15px 10px 0 40px;
  padding-bottom: 15px;
}
.trailer-list-byday-container {
  margin-top: 25px;
  .trailer-list-byday-title {
    display: block;
    color: #aebccc;
    font-family: "SimSun";
    font-size: 14px;
    border-left: 4px solid #1c6bbb;
    padding-left: 8px;
  }
}
</style>
