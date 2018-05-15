<template>
  <div class = 'topnav fixed-top clearfix'>
    <!-- logo -->
    <div
      v-bind:class="sizeClass"
      class = 'topnav-left-logo-wrapper topnav-item-wrapper'>
      <img src = 'http://dummyimage.com/178x45' />
    </div><!-- previent white space
    left items group
  --><ul
      class = 'topnav-left-list topnav-list topnav-item-wrapper'
      v-bind:class="sizeClass"
    >
      <template v-for="(item,index) in navItems">
        <a
          v-bind:key=index
          class = 'topnav-left-list-item topnav-list-item clickable'
        >
          {{item}}
        </a><!--
     --><em
          v-bind:class="sizeClass"
          v-if="index < navItems.length - 1"
          v-bind:key="'em'+index"
        ></em>
      </template>
    </ul>
    <!-- right login group -->
    <ul class = 'topnav-right-list topnav-list topnav-item-wrapper float-right'>
      <li
        class = 'topnav-right-list-item topnav-list-item clickable'
      >
        登录
      </li><!--
   --><li
        class = 'topnav-right-list-item topnav-list-item clickable'
      >
        注册
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// types
import {Getter} from 'vuex-class';
import Component from 'vue-class-component';
import {Dimension} from '../store/Dimension';
import {Watch} from 'vue-property-decorator';

import Vue from 'vue'
@Component
export default class TopNav extends Vue {
  // data
  navItems: string[] = ['首页','资讯','娱乐','汽车','直播号','体育','生活','健康','艺术'];
  // computed
  @Getter('Dimension/className') sizeClass!: string;
}
</script>

<style lang="less" scoped>
@import '../assets/styles/variables.less';
.topnav {
  width: 100%;
  height: 70px;
  background: black;
  border-bottom: 1px solid #FF3333;
  z-index: 100;

  .topnav-item-wrapper {
    display: inline-block;
  }  
  .topnav-list {
    vertical-align: top;
    overflow: hidden;

    .topnav-list-item {
      line-height: 70px;
    }
  }
  .topnav-left-logo-wrapper.large {
    margin-left: @margin-xxlarge;
    margin-top: @margin-small;
  }
  .topnav-left-logo-wrapper.medium {
    margin-left: 30px;
    margin-top: 17px;
  }
  .topnav-left-logo-wrapper.small {
    margin-left: @margin-large;
    margin-top: @margin-small;
  }
  .topnav-left-logo-wrapper {
    width: 178px;
    height: 45px;
    overflow: hidden;
  } // end of topnav-left-logo-wrapper
  .topnav-left-list.large {
    margin-left: @margin-xxxlarge;
  }
  .topnav-left-list.medium {
    margin-left: 32px;
  }
  .topnav-left-list.small {
    margin-left: @margin-large;
  }
  .topnav-left-list-item {
    display: inline-block;
    text-align: left;
  }
  .topnav-left-list-item:first-of-type {
    color: @theme-red;
    font-weight: bold;
    font-size: @font-large;
  }
  .topnav-left-list-item:not(:first-of-type) {
    color: @theme-grey;
    font-size: @font-medium;
  }
  em {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(/static/nav_line.png) no-repeat;
  }
  em.large {
    margin-left: 27px;
    margin-right: 27px;
  }
  em.medium {
    margin-left: 15px;
    margin-right: 15px;      
  }
  em.small {
    margin-left: @margin-xxsmall;
    margin-right: @margin-xxsmall;
  }
  .topnav-right-list {
    margin-right: @margin-xxsmall;

    .topnav-right-list-item {
        display: inline-block;
        color: @theme-grey;
        font-size: @font-small;
        margin-right: @margin-medium;
    }
  }
}
</style>
