<template>
  <div class = 'other-program-container'>
    <program-list />
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';

import Vue from 'vue';
import ProgramList from './program-list.vue';

@Component({
  components: {
    ProgramList
  }
})
export default class HomeOtherProgram extends Vue {
  // computed
  @Getter('Dimension/liveMainWidth') mainWidth!: number;
}
</script>

<style lang="less" scoped>
.other-program-container {
  margin-top: 50px;
  margin-bottom: 85px;

  height: 300px;
}
</style>
