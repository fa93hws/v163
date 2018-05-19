<template>
  <div class = 'lzimg-container'>
    <!-- <div
      class = 'lzimg-loading-mask'
    /> -->
    <img
      class = 'lzimg-img'
      v-bind:src="imgUrl"
      ref='lzimg'
    />
  </div>
</template>

<script lang="ts">
// type
import { NewImgPayload,LoadStatus } from '../types';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Getter,Mutation } from 'vuex-class';

import Vue from 'vue';

@Component
export default class LazyImg extends Vue {
  // type
  $refs!: {
    lzimg: HTMLElement;
  };
  // props
  @Prop({ required: true })
  imgUrl!: string;
  // data
  isLoaded: boolean = false;
  lazyIdx!: number;
  // computed
  @Getter('LazyStore/numImgs') numImg!: number;
  @Getter('LazyStore/getStauts') status!: (idx: number) => LoadStatus;
  // method
  @Mutation('LazyStore/mountNewImg') pushImg!: (payload: NewImgPayload) => void;
  mounted () {
    this.lazyIdx = this.numImg;
    console.log(this.lazyIdx);
    this.pushImg({
      element: this.$refs.lzimg
    });
  }
}
</script>

<style scoped>

</style>
