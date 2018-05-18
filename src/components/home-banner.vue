<template>
  <div class='banner-container center'>
    <LoadingSpinner class = 'banner-frame loading-spinner center'>
    </LoadingSpinner>
    <div class = 'banner-frame'>
      <div class='banner-carousel'>
      </div>
      <div class='banner-next'>
      </div>
      <div class='banner-previous'>
      </div>
      <div class='banner-control'>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// type
import Component from 'vue-class-component';

import Vue from 'vue';
import LoadingSpinner from './loading-spinner.vue';
import { HomeApis,BannerImgsReply } from '../api/home-api';

@Component({
  components: {
    LoadingSpinner
  }
})
export default class HomeBanner extends Vue {
  // data
  isLoaded: boolean = false;
  imgUrls!: string[];

  // methods
  async fetchImgs () {
    HomeApis.fetchBannerImgs().then((data: BannerImgsReply) => {
      this.imgUrls = data.urls;
    }).catch((error: any) => {
      console.log(error);
    })
  }
  mounted (): void {
    this.fetchImgs();
  }
}
</script>

<style lang="less" scoped>
.banner-container {
  width: 600px;
  height: 300px;
}
.loading-spinner {
  position: relative;
  top: 50%;
  transform: translateY(50%);
}
</style>
