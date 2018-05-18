<template>
  <li v-bind:class="['trailer-item clearfix',sizeClass]">
    <span class='trailer-item-time'>
      {{trailerInfo.timeOnAir.format('HH:mm')}}
    </span><!--
 --><span class='trailer-item-title-container'>
      <a>
        {{trailerInfo.title}}
      </a>
    </span>
  </li>
</template>

<script lang="ts">
// types
import { Getter } from 'vuex-class';
import { TrailerInfo } from '../../types';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';

import Vue from 'vue';

@Component
export default class TrailerCard extends Vue {
  @Prop({ required: true })
  trailerInfo!: TrailerInfo;
  @Getter('Dimension/classNameTwo') sizeClass!: string;
}
</script>

<style lang='less' scoped>
.trailer-item {
  position: relative;
  display: block;
  width: 100%;
  span {
    display: inline-block;
    vertical-align: top;
  }
  .trailer-item-time {
    font-family: "Georgia";
    width: 55px;
    font-size: 20px;
    color: #89a3be;
    margin-right: 25px;
    display: inline-block;
    margin-top: 15px;
    margin-left: 10px;
  }
  .trailer-item-title-container {
    width: 255px;
    padding: 20px 0;
  }
  a {
    color: #d9e1e8;
    font-size: 14px;
    font-family: "Microsoft Yahei";    
    text-indent: 0;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.trailer-item.large {
  background: url(/static/bar_line.png) no-repeat;
  background-position: -20px bottom;
  .trailer-item-time {
    margin-left: 15px;
  }
  .trailer-item-title-container {
    width: 255px;
  }
}
.trailer-item.medium {
  background: url(/static/bar_line1.png) no-repeat;
  background-position: -20px bottom;
  .trailer-item-time {
    margin-left: 10px;
  }
  .trailer-item-title-container {
    width: 175px;
  }
}
</style>