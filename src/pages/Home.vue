<template>
  <div class = 'home'>
    <HomeMain /><!-- remove the space
 --><RightNav @navChange="onNavToggle"/>
    <!-- float tool bar -->
    <ul
      v-show="!showOnAir"
      v-bind:class="['float-toolbar',sizeClass]">
      <li class = 'float-toolbar-comment clickable'></li>
      <li class = 'float-toolbar-totop clickable'></li>
    </ul>
    <!-- bottom content -->
  </div>
</template>

<script lang="ts">
// types
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { Dimension } from '../store/Dimension';
import { Getter } from 'vuex-class';

import Vue from 'vue';
import HomeMain from '../components/home-main.vue';
import RightNav from '../components/right-nav/index.vue';

@Component({
  components: {
    HomeMain,
    RightNav
  }
})
export default class Home extends Vue {
  // data
  showOnAir: boolean = true;
  // computed
  @Getter('Dimension/className') sizeClass!: string;
  // methods
  onNavToggle(showOnAir: boolean): void {
    this.showOnAir = showOnAir;
  }
}
</script>

<style lang='less' scoped>
.float-toolbar.small {
  display: none;
}
.float-toolbar.large {
  margin-left: 420px;
}
.float-toolbar.medium {
  margin-left: 325px;
}
.float-toolbar {
  width: 40px;
  height: 82px;
  position: fixed;
  left: 50%;
  top: 50%;
  bottom: 200px;
  z-index: 299;
  li {
    width: 40px;
    height: 40px;
    background-position: 0 0;
    text-indent: -999em;
  }
  .float-toolbar-comment {
    margin-bottom: 2px;
  }
  .float-toolbar-comment:not(:hover) {
    background: url(/static/guide.png) no-repeat;
  }
  .float-toolbar-comment:hover {
    background: url(/static/guide_hover.png) no-repeat;
  }
  .float-toolbar-totop:not(:hover) {
    background: url(/static/top.png) no-repeat;
  }
  .float-toolbar-totop:hover {
    background: url(/static/top_hover.png) no-repeat;
  }
}
</style>
