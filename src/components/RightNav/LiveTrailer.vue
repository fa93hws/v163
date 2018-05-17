<template>
  <div>
    Trailer
  </div>
</template>

<script lang="ts">
// type
import { VideoInfo } from '../..//types';
import { Prop } from 'vue-property-decorator';
import { Getter,Action } from 'vuex-class';
import Component from 'vue-class-component';

import Vue from 'vue';

@Component
export default class LiveTrailer extends Vue {
  @Getter('Video/sortedTrailerList') sortedList!: VideoInfo[];

  mounted () {
    console.log(this.sortedList);
  }
}
</script>

<style lang="less" scoped>

</style>
