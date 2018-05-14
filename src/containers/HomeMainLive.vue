<template>
  <div class = 'live-container'>
    <div class = 'empty-element'>&nbsp;</div>
    <div class = 'live-player-wrapper center'>
      <div class = 'live-player'>
        player here
      </div>
      <div class = 'live-player-toolbar clear-fix clearfix'>
        <!-- toolbar title -->
        <div class = 'live-player-toolbar-info'>
          <h2>{{liveInfo.title}}</h2>
          <span>{{formatNumber(liveInfo.viewersCount)}}参与</span>
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue'
import Component from 'vue-class-component';

@Component
export default class HomeMainLive extends Vue {
  // define types
  $refs!: {
    shareToIcon: [HTMLElement];
  }
  // data
  shareTo: string[] = ['yixin','wechat','weibo','qzone'];
  // computed
  get liveInfo () {
    return {
      url: '',
      title: '直击猎豹与狮子对决 谁才是最后赢家？',
      viewersCount: 333000
    }
  }
  // methods
  formatNumber = function(x: number): string {
    if (x < 10000)
      return x.toString();
    else if (x < 100000000)
      return (x/10000).toFixed(1).toString() + '万';
    else
      return (x/100000000).toFixed(1).toString() + '亿';
  }
  toggleAnimation = function(this: HomeMainLive, id: number): void {
    var classList: DOMTokenList = this.$refs.shareToIcon[id].classList;
    console.log('toggle');
    if (classList.length < 2) {
      classList.add('hover');
    } else if (classList.contains('hover')) {
      classList.replace('hover','release');
    } else if (classList.contains('release')) {
      classList.replace('release','hover')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/styles/variables.less';
.live-container {
  width: 100%;
  height: 645px;
  background: url(/static/bg.png) center center no-repeat;

  .live-player-wrapper {
    margin-top: @margin-large;
    width: 960px;
    height: 565px;    

    .live-player {
      width: 100%;
      height: 540px;
      background: silver;
    }
    .live-player-toolbar {
      // margin-top: @margin-xxsmall;
      padding-top: @margin-medium;
      width: 100%;
      height: 54px;
      // background: url(/static/title_bg.png) center center no-repeat;
      background-size: cover;

      .live-player-toolbar-info {
        display: inline-block;
        margin-left: @margin-xsmall;
        h2 {
          display: inline-block;
          font-size: @font-xlarge;
          color: @theme-white;
        }
        span {
          display: inline-block;
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
        margin-right: @margin-xsmall;
        span {
          display: inline-block;
          width: 100px;
          height: 28px;
          background-image: url(/static/enter_icon.png);
          margin-top: @margin-xxxsmall;
        }
        span:hover {
          background-position: 0 -29px;
        }
        ul {
          display: inline-block;
          vertical-align: top;
          margin-left: @margin-xxsmall;
          li {
            display: inline-block;
            margin-left: @margin-xsmall;
            width: 25px;
            height: 25px;
            border-radius: 25px;
            border-color: @theme-grey;
            border-style: solid;
            border-width: 1px;
            z-index: 10;
            i {
              display: inline-block;
              width: 17px;
              height: 17px;
              background-size: cover;
              margin: 4px;
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
    background-position: 0px -17px;
  }
}
@keyframes anime-release {
  0% {
    background-position: 0px -17px;
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
