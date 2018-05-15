<template>
  <div class = 'home'>
    <HomeMain /><!-- remove the space
 --><RightNav />
  </div>
</template>

<script lang="ts">
// types
import Component from 'vue-class-component';
import {Watch} from 'vue-property-decorator';
import {Dimension} from '../store/Dimension';
import {Getter} from 'vuex-class';

import Vue from 'vue'
import HomeMain from '../components/HomeMain.vue';
import RightNav from '../components/RightNav';

@Component({
  components: {
    HomeMain,
    RightNav
  }
})
export default class Home extends Vue {
  mounted () {
    // new Vue({
    //   el: '#right-nav-bar',

    //   template: "<div>1</div>"
    // })
  }
}
</script>

<style lang='less' scoped>
</style>
