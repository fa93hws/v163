<template>
  <li
    class = 'channels-card clickable'
    v-bind:class="[sizeClass,{'active':active}]"
    @mousedown="$emit('mousedown')"
  >
  <!-- image  -->
    <div
      class = 'card-image-wrapper'
      v-bind:class="[sizeClass,{'active':active}]"
    >
      <img
        class = 'card-image'
        style = 'width:100%,height:100%'
        v-bind:src="info.imgUrl"
      />
      <span v-if="info.type===0">直播</span>
    </div><!-- remove white space
    /********/
    title
    /********/
 --><div
      class = 'card-title'
      v-bind:class="[sizeClass,{'active':active}]"
    >
      <p v-bind:class="{'active':active}">{{info.title}}</p><!--
   --><span v-show="!active">{{formattedNumber}}人参与</span>
    </div><!-- remove white space
    /********/
    silder
    /********/
 --><div
      class = 'card-slider'
      v-bind:class="[sizeClass,{'active':active}]"
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
import { VideoInfo,VideoType } from '@/types';

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
  @Getter('Dimension/classNameTwo') sizeClass!: string;

  get formattedNumber (): string {
    return Utils.escapeNumAudience(this.info.numAudience);
  }

  // methods
}
</script>

<style lang='less' scoped>
@import '../../assets/styles/variables.less';
.channels-card:hover {
  background: #1b62a9;
}
.channels-card.active {
  height: 65px;
  padding: 21px 0;
}
.channels-card:not(.active){
  height: 67px;
  padding: 15px 0;
}
.channels-card.medium {
  width: 290px;
}
.channels-card.large {
  height: 80px;
  width: 390px;
}
.channels-card {
  position: relative;
  border-top: 1px solid #0d3b6a;
  cursor: pointer;
  // card-image-wrapper fro different size and active status
  .card-image-wrapper.active {
    margin-left: 0px;
  }
  .card-image-wrapper.small:not(.active),
  .card-image-wrapper.medium:not(.active) {
    margin-left: 15px;
  }
  .card-image-wrapper.large:not(.active), {
    margin-left: @margin-medium;
  }
  .card-image-wrapper.small,
  .card-image-wrapper.medium {
    width: 115px;
    height: 65px;
  }
  .card-image-wrapper.large {
    width: 142px;
    height: 80px;
  }
  // end of card-image-wrapper fro different size and active status
  .card-image-wrapper {
    display: inline-block;
    position: relative;
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
  // card-title for different size and active status
  .card-title.active p {
    -webkit-line-clamp: 3;
  }
  .card-title:not(.active) p {
    -webkit-line-clamp: 3;
  }
  .card-title.medium.active {
    width: 115px;
    p {
      width: 115px;
      height: 65px;
    }
  }
  .card-title.large.active {
    width: 140px;
  }
  .card-title.medium:not(.active) {
    width: 130px;
    p {
      height: 40px;
      width: 130px;
    }
  }
  .card-title.large:not(.active) {
    width: 178px;
    p {
      margin-bottom: 15px;
    }
  }
  .card-title.medium {
    margin-left: @margin-xsmall;
    p {
      margin-top: -5px;
      margin-bottom: 10px;
    }
  }
  .card-title.large {
    margin-left: @margin-medium;
  }
  // card-title for different size and active status
  .card-title {
    display: inline-block;
    font-family: "Microsoft Yahei";
    vertical-align: top;
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
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    span {
      vertical-align: top;
      color: #9db2c8;
      font-size: @font-xsmall;
      padding: 2px 8px;
      display: inline-block;
      background: #0c3b6f;
      border-radius: 10px;
    }
  }
  // card-slider for different sizes and active status
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
  .card-slider.medium {
    width: 260px;
    border-right: 45px solid #2780da;

    .card-slider-arrow {
      width: 34px;
      left: 102%;
      background: url(/static/hover_sorrow1.png) no-repeat;
      background-position: 0, 50%;
    }
  }
  .card-slider.large {
    width: 330px;
    border-right: 75px solid #2780da;

    .card-slider-arrow {
      width: 42px;
      left: 105%;
      background: url(/static/hover_sorrow.png) no-repeat;
      background-position: 0, 50%;
    }
  }
  // end of card-slider for different sizes and active status
  .card-slider {
    height: 100%;
    display: inline-block;
    position: absolute;
    top: 0px;
    background: #1b62a9;
    z-index: 21;

    .card-slider-arrow {
      height: 100%;
      position: relative;
      display: block;
      background-size: contain;
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