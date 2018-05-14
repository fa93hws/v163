<template>
  <div class = 'topnav fixed-top clearfix'>
    <!-- logo -->
    <div class = 'topnav-left-logo-wrapper topnav-item-wrapper'>
      <img src = 'http://dummyimage.com/178x45' />
    </div><!-- previent white space
    left items group
  --><ul class = 'topnav-left-list topnav-list topnav-item-wrapper'>
      <template v-for="(item,index) in navItems">
        <a
          v-bind:key=index
          class = 'topnav-left-list-item topnav-list-item clickable'
        >
          {{item}}
        </a>
        <em
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
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class TopNav extends Vue {
  navItems: string[] = ['首页','资讯','娱乐','汽车','直播号','体育','生活','健康','艺术'];

}
</script>

<style lang="less" scoped>
@import '../assets/styles/variables.less';
.topnav {
  width: 100%;
  height: 71px;
  background: black;
  border-bottom: 1px solid #FF3333;

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
  .topnav-left-logo-wrapper {
    width: 178px;
    height: 45px;
    overflow: hidden;
    margin-left: @margin-xxlarge;
    margin-top: @margin-small;
  } // end of topnav-left-logo-wrapper
  .topnav-left-list {
    margin-left: @margin-xxxlarge;

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
      margin-left: @margin-large;
      margin-right: @margin-large;
      background: url(/static/nav_line.png) no-repeat;
    }
  } // end of topnav-left-list
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
