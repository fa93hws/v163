<template>
  <li
    class = 'channels-card clickable'
    v-bind:class="[sizeClass,{'active':active}]"
    @mousedown="$emit('mousedown')"
  >
    <div
      class = 'card-image-wrapper'
      v-bind:class="{'active':active}"
    >
      <img
        class = 'card-image'
        v-bind:src="info.imgUrl"
      />
      <span v-if="info.status==0">直播</span>
    </div>
    <div
      class = 'card-title'
      v-bind:class="{'active':active}"
    >
      <p v-bind:class="{'active':active}">{{info.title}}</p>
      <span v-show="!active">{{formattedNumber}}人参与</span>
    </div>
    <div
      class = 'card-slider'
      v-bind:class="{'active':active}"
    >
      <i class = 'card-slider-arrow'/>
    </div>
  </li>
</template>

<script lang='ts'>
// type
import { Getter } from 'vuex-class';
import { Watch, Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { VideoInfo } from '@/types';

import Vue from 'vue';
import Utils from '../../api/Utils';

@Component
export default class Card extends Vue {
  // props
  @Prop({ required: true })
  info!: VideoInfo;
  @Prop({ default: false })
  active!: boolean;

  // computed
  @Getter('Dimension/className') sizeClass!: string;
  get formattedNumber (): string {
    return Utils.escapeNumAudience(this.info.numAudience);
  }

  // methods
}
</script>

<style lang='less' scoped>
@import '../../assets/styles/variables.less';
.channels.large {
  width: 390px;
}
.channels.medium,
.channels.small {
  width: 290px;
}
.channels-card:hover {
  background: #1b62a9
}
.channels-card.active {
  padding: 21px 0;
}
.channels-card:not(.active){
  padding: 15px 0;
}
.channels-card {
  position: relative;
  border-top: 1px solid #0d3b6a;
  height: 80px;
  cursor: pointer;

  .card-image-wrapper.active {
    margin-left: 0px;
  }
  .card-image-wrapper:not(.active) {
    margin-left: @margin-medium;
  }
  .card-image-wrapper {
    display: inline-block;
    position: relative;
    width: 142px;
    height: 80px;    
    z-index: 25;
    
    .card-image {
      width: 100%;
      height: 100%;
    }
    span {
      position: absolute;
      display: block;
      width: 30px;
      height: 20px;
      top: 0;
      left: 0;
      background: #f33;
      color: #ededed;
      font-family: "SimSun";
      text-align: center;
      line-height: 20px;
      font-size: @font-xsmall;
    }
  } //end of card-image-wrapper
  .card-title.active {
    width: 140px;
  }
  .card-title:not(.active) {
    width: 178px;
  }
  .card-title {
    display: inline-block;
    font-family: "Microsoft Yahei";
    vertical-align: top;
    margin-left: 20px;    
    height: 100%;
    position: relative;
    z-index: 25;

    p.active {
      color: #eee;
      font-weight: bold;
    }
    p:not(.active){
      color: #d9e1e8;
    }
    p {
      font-size: @font-small;
      margin-bottom: 15px;
    }
    span {
      color: #9db2c8;
      font-size: @font-xsmall;
      padding: 2px 8px;
      display: inline-block;
      background: #0c3b6f;
      border-radius: 10px;
    }
  }
  .card-slider.active {
    border-left: 5px solid #2780da;
    opacity: 1;
    left: -20px;
  }
  .card-slider:not(.active) {
    opacity: 0;
    border-left: 0;
    left: 380px;
  }
  .card-slider {
    display: inline-block;
    position: absolute;
    top: 0px;
    width: 330px;
    height: 122px;
    background: #1b62a9;
    border-right: 75px solid #2780da;
    z-index: 21;

    .card-slider-arrow {
      position: absolute;
      top: 20px;
      right: -58px;
      width: 42px;
      height: 80px;
      display: block;
      background: url(/static/hover_sorrow.png) no-repeat;
      background-position: 0px, -40px;
      
    }    
  }
}

// animation
.card-image-wrapper {
  transition: all .2s ease-in-out .1s;
}
.card-slider {
  transition: left .3s ease-in-out,opacity .3s ease-in-out,border-left .1s ease-in-out .28s;
}

</style>