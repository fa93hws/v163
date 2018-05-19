<template>
  <div
    class='lzimg-container'
    ref='lzimg'
  >
    <img
      v-if="!isReady"
      src='/static/loading.svg'
      class="lzimg-loading-mask"
    />
    <img
      v-if="isSeen"
      v-show="isReady"
      class = 'lzimg-img'
      v-bind:src="imgUrl"
      @load="finishLoad"
    />
  </div>
</template>

<script lang="ts">
// type
import { NewImgPayload,LoadStatus } from '../types';
import Component from 'vue-class-component';
import { Prop,Watch } from 'vue-property-decorator';
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
  isReady: boolean = false;
  // computed
  @Getter('LazyStore/numImgs') numImg!: number;
  @Getter('LazyStore/statusList') statusList!: LoadStatus[];
  get isSeen (): boolean {
    let status = this.$store.getters['LazyStore/getStatus'](this.lazyIdx);
    if (typeof status === 'undefined') return false;
    return this.$store.getters['LazyStore/getStatus'](this.lazyIdx) !== LoadStatus.notSeen;
  }
  @Mutation('LazyStore/mountNewImg') pushImg!: (payload: NewImgPayload) => void;
  @Mutation('LazyStore/imgLoaded') onImgLoad!: (idx: number) => void;
  finishLoad (): void {
    this.onImgLoad(this.lazyIdx);
    this.isReady = true;
    this.$emit('load');
  }
  mounted () {
    this.lazyIdx = this.numImg;
    this.pushImg({
      element: this.$refs.lzimg
    });
  }
}
</script>

<style scoped>
.lzimg-loading-mask,
.lzimg-img {
  width: 100%;
  height: 100%;
}
</style>
