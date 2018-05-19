<template>
  <div id="app">
    <top-nav />
    <router-view/>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';

import TopNav from '@/components/top-nav.vue';

@Component({
  components: {
    TopNav
  }
})
export default class App extends Vue {

}
</script>

<style>
  @import './assets/styles/reset.css';
  @import './assets/styles/global.css';
</style>
