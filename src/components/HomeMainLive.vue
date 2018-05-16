<template>
  <div class = 'live-container'>
    <div class = 'empty-element'>&nbsp;</div>
    <div 
      class = 'live-player-wrapper center'
      v-bind:style="{width: playerDimension[0]+'px'}"
    >
      <div 
        class = 'live-player'
        v-bind:style="{width: playerDimension[0]+'px', height: playerDimension[1]+'px'}"
      >
        player here
      </div>
      <!-- tool bar  -->
      <div
        class = 'live-player-toolbar clear-fix clearfix'
        v-bind:class="sizeClass"
      >
        <!-- toolbar title -->
        <div class = 'live-player-toolbar-info'>
          <h2>{{selectedVideo.title}}</h2>
          <span>{{formattedNumber}}参与</span>
        </div>
        <!-- right icons group -->
        <div class = 'live-player-toolbar-interaction float-right'>
          <span class = 'live-player-toolbar-interaction-enter'>
          </span>
          <ul>
            <li
              v-for="(toApp,index) in shareTo"
              v-bind:key = index
              class = 'clickable'
              @mouseover="toggleAnimation(index)"
              @mouseout="toggleAnimation(index)"
            >
              <i
                ref='shareToIcon'
                v-bind:class="toApp"
              />
            </li>
          </ul>
        </div>
        <!-- end of right icons group -->
      </div>
      <!-- end of tool bar  -->
    </div>
  </div>
</template>

<script lang="ts">
import { Getter } from 'vuex-class';
import { VideoInfo,VideoType } from '@/types';
import { Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';

import Vue, { VNode } from 'vue';
import Utils from '../api/Utils';

@Component
export default class HomeMainLive extends Vue {
  // define types
  $refs!: {
    shareToIcon: [HTMLElement];
  };

  // data
  shareTo: string[] = ['yixin','wechat','weibo','qzone'];

  // computed
  @Getter('Dimension/livePlayerDimension') playerDimension!: number[];
  @Getter('Dimension/className') sizeClass!: string;
  @Getter('Video/selected') selectedVideo!: VideoInfo;
  get formattedNumber (): string {
    return Utils.escapeNumAudience(this.selectedVideo.numAudience);
  }

  // methods
  toggleAnimation (this: HomeMainLive, id: number): void {
    let classList: DOMTokenList = this.$refs.shareToIcon[id].classList;
    if (classList.length < 2) {
      classList.add('hover');
    } else if (classList.contains('hover')) {
      classList.replace('hover','release');
    } else if (classList.contains('release')) {
      classList.replace('release','hover');
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/styles/variables.less';
.live-container {
  width: 100%;
  background: url(/static/bg.png) center center no-repeat;
  background-size: cover;

  .live-player-wrapper {
    margin-top: @margin-large;
    // width: 960px;
    height: 100%;

    .live-player {
      width: 100%;
      height: 545px;
      background: silver;
    }
    .live-player-toolbar {
      // margin-top: @margin-xxsmall;
      padding-top: @margin-medium;
      width: 100%;
      height: 54px;
      background: url(/static/title_bg.png) center center no-repeat;
      background-size: cover;

      .live-player-toolbar-info {
        display: inline-block;
        margin-left: @margin-xsmall;
        position: relative;
        top: 50%;
        transform: translateY(-100%);
        h2 {
          display: inline-block;
          font-size: @font-xlarge;
          color: @theme-white;
        }
        span {
          display: inline-block;
          vertical-align: top;
          margin-left: @margin-xsmall;
          padding: 7px @margin-xsmall;
          border-radius: 15px;
          font-size: @font-xsmall;
          background: rgba(12,20,33,0.7);
          color: #B3B3B3;
        }
      } // end of live-player-toolbar-title
      .live-player-toolbar-interaction {
        display: inline-block;
        position: relative;
        top: 50%;
        transform: translateY(-100%);

        span {
          display: inline-block;
          vertical-align: top;
          width: 100px;
          height: 29px;
          background-image: url(/static/enter_icon.png);
        }
        span:hover {
          background-position: 0 -29px;
        }
        ul {
          display: inline-block;
          vertical-align: top;
          margin-right: @margin-xsmall;
          li {
            display: inline-block;
            margin-left: @margin-xsmall;
            width: 22px;
            height: 22px;
            border-radius: 22px;
            border-color: @theme-grey;
            border-style: solid;
            border-width: 1px;
            z-index: 10;
            i {
              display: inline-block;
              width: 16px;
              height: 16px;
              background-size: cover;
              margin: 3px;
              z-index: 9;
            }
            i.release {
              animation: anime-release 0.3s;
            }
            i.hover {
              animation: anime-hover 0.3s;
              background-position: 0px -17px;
            }
          } // end of li in live-player-toolbar-interaction
        } // end of ul in live-player-toolbar-interaction
      } // end of span in live-player-toolbar-interaction
    } // end of live-player-toolbar
  } // end of live-player-wrapper
} // end of live-container

// share to icons
@keyframes anime-hover {
  0% {
    background-position: 0px 0px;
  }
  90% {
    background-position: 0px -25px;
  }
  100% {
    background-position: 0px -16px;
  }
}
@keyframes anime-release {
  0% {
    background-position: 0px -16px;
  }
  90% {
    background-position: 0px 8px;
  }
  100% {
    background-position: 0px 0px;
  }
}
.yixin {
  background-image: url('/static/yixin0.svg');  
}
.wechat {
  background-image: url('/static/wechat.svg');   
}
.weibo {
  background-image: url('/static/weibo.svg');   
}
.qzone {
  background-image: url('/static/qzone.svg');   
}
</style>
