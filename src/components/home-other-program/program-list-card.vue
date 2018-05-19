<template>
  <li class = 'program-item-wrapper'>
    <a class = 'item-img-wrapper'>
      <lazy-img
        class = 'item-img'
        :imgUrl="cardInfo.imgUrl"
      />
    </a>
    <a>
      <h3 class = 'item-title'>{{cardInfo.title}}</h3>
    </a>
    <div class = 'item-detail'>
      <span
         class = 'item-detail-type'
        v-bind:class="label[0]"
      >
        {{label[1]}}
      </span><span class = 'item-detail-audience'>
        {{audience}}
      </span>
    </div>
  </li>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { ProgramType,ProgramCard } from '../../types';

import Vue from 'vue';
import Utils from '../../api/utils';
import LazyImg from '../lazy-img.vue';

@Component({
  components: {
    LazyImg
  }
})
export default class ProgramListCard extends Vue {
  // data
  cardInfo: ProgramCard = {
    imgUrl: 'http://cms-bucket.nosdn.127.net/4ce0f30f89c649b9a75948eba6aaa48420180518182339.jpg?imageView&thumbnail=220y120&quality=85',
    title: '中国最大的航站楼 白云T2南航实力登场',
    numAudience: 282123,
    type: ProgramType.review,
    multiSource: false,
    href: 'http://live.163.com/room/180209.html'
  }
  // computed
  get label (): string[] {
    switch (this.cardInfo.type) {
      case ProgramType.live:
        return ['live','正在直播'];
      case ProgramType.soon:
        return ['soon','即将直播'];
      case ProgramType.review:
        return ['review','回顾'];
    }
  }
  get audience(): string {
    return Utils.escapeNumAudience(this.cardInfo.numAudience);
  }
}
</script>

<style lang="less" scoped>
.program-item-wrapper {
  position: relative;
  margin-right: 25px;
  margin-bottom: 40px;
  width: 220px;
  height: 205px;
}
.item-img-wrapper {
  width: 220px;
  height: 120px;
  .item-img {
    max-width: 100%;
    max-height: 100%;
  }
}
.item-title {
  width: 220px;
  color: #f0f0f0;
  font-family: "Microsoft Yahei";
  font-size: 14px;
  font-weight: normal;
}
.item-detail {
  .review {
    background: #727273;
    color: #e8e8e8;
  }
  .item-detail-type {
    font-family: "SimSun";
    font-size: 12px;
    padding: 3px 8px;
    margin-right: 5px;
    border-radius: 10px;
  }
  .item-detail-audience {
    color: #bbb;
    font-family: "SimSun";
    font-size: 12px;
    border-left: 1px solid #5b5e62;
    padding-left: 7px;
  }


}
</style>
