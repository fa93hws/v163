<template>
  <div class='banner-container center'>
    <!-- loading spinner -->
    <LoadingSpinner 
      class = 'banner-frame vertical-center center'
      v-if="!receiveResponse"
    />
    <!-- error image -->
    <div
      class = 'banner-frame vertical-center center'
      v-else-if="numImg==0"
    >
      无
    </div>
    <!-- main -->
    <div 
      v-else
      class = 'banner-frame'
      @mouseenter="isControlButtonShown=true"
      @mouseleave="isControlButtonShown=false"
    >
      <div
        class='banner-carousel animate'
        ref="carousel"
      >
        <!-- image carousels -->
        <div
          class = 'banner-image-wrapper'
          v-for="(url,idx) in imgUrls"
          v-bind:key="idx"
        >
          <!-- <LoadingSpinner 
              class = 'banner-image vertical-center center'
              v-show="!imgLoaded[idx]"
          /> -->
          <img
            class = 'banner-image'
            v-bind:src="imgUrls[idx]"
            @load="imgLoaded[idx] = true"
          />
        </div>
      </div>
    </div>
    <!-- end fo frame -->
    <div
      class='banner-next-wrapper clickable'
      @mouseenter="isControlButtonShown=true"
      @mouseleave="isControlButtonShown=false"
    >
    </div>
    <div
      v-bind:class="['banner-next clickable animate',{'active':isControlButtonShown}]"
      @mouseenter="isControlButtonShown=true"
      @mouseleave="isControlButtonShown=false"
      @mousedown="next"
    />
    <div
      class='banner-previous-wrapper clickable'
      @mouseenter="isControlButtonShown=true"
      @mouseleave="isControlButtonShown=false"
    >
    </div>
    <div
      v-bind:class="['banner-previous clickable animate',{'active':isControlButtonShown}]"
      @mouseenter="isControlButtonShown=true"
      @mouseleave="isControlButtonShown=false"
      @mousedown="previous"
    />
    <div class='banner-control'>
    </div>
  </div>
</template>

<script lang="ts">
// type
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

import Vue from 'vue';
import LoadingSpinner from './loading-spinner.vue';
import { HomeApis,BannerImgsReply } from '../api/home-api';

@Component({
  components: {
    LoadingSpinner
  }
})
export default class HomeBanner extends Vue {
  $refs!: {
    carousel: HTMLElement
  }
  // data
  imgUrls: string[] = [];
  receiveResponse: boolean = false;
  imgLoaded: boolean[] = [];
  currentImgIdx: number = 1;
  imgWidth = 600;
  isControlButtonShown: boolean = false;
  // computed
  get numImg (): number { return this.imgUrls.length; }

  // methods
  prepareCarousel (): void {
    this.$refs.carousel.style.width = 600 * this.numImg + 'px';
  }
  next (): void {
    if (this.currentImgIdx == this.imgUrls.length-1) {
      this.resetToFirst();
    } else {
      this.currentImgIdx++;
      this.doTransform();
    }
  }
  previous (): void {
    if (this.currentImgIdx == 0) {
      this.resetToLast();
    } else {
      this.currentImgIdx--;
      this.doTransform();
    }
  }
  resetToFirst (): void {
    this.$refs.carousel.classList.remove('animate');
    this.currentImgIdx = 1;
    this.doTransform();
    this.$nextTick(() => {
      this.$refs.carousel.classList.add('animate');
      this.next();
    })
  }
  resetToLast (): void {
    this.$refs.carousel.classList.remove('animate');
    this.currentImgIdx = this.imgUrls.length - 2;
    this.doTransform();
    this.$nextTick(() => {
      this.$refs.carousel.classList.add('animate');
      this.previous();
    })
  }
  doTransform (): void {
    this.$refs.carousel.style.transform = 'translateX(-' + this.currentImgIdx * this.imgWidth + 'px)';
  }
  async fetchImgs () {
    HomeApis.fetchBannerImgs().then((data: BannerImgsReply) => {
      this.imgUrls = [data.img[data.img.length-1], ...data.img, data.img[0]];
      this.imgLoaded.push.apply(this.imgLoaded,Array(this.imgUrls.length).fill(false));
      this.receiveResponse = true;
      this.$nextTick(() => {
        this.prepareCarousel();
      })
    }).catch((error: any) => {
      console.log(error);
      this.receiveResponse = true;
    })
  }

  mounted (): void {
    this.fetchImgs();
  }
}
</script>

<style lang="less" scoped>
.banner-frame,
.banner-image,
.banner-image-wrapper,
.banner-container {
  width: 600px;
  height: 300px;
}
.banner-container {
  position: relative;
  z-index: 20;
}
.vertical-center {
  position: relative;
  top: 50%;
  transform: translateY(50%);
  font-size: 50px;
  text-align: center;
}
// frame
.banner-frame {
  overflow: hidden;
}
// carousel
.animate {
  transition: transform 0.3s;
}
.banner-carousel {
  transform: translateX(-600px);
  height: 300px;
}
// images
.banner-image-wrapper {
  display: inline-block;
}
// control
.banner-previous-wrapper {
  transform: translate(-100%,-50%);
}
.banner-next-wrapper {
  left: 100%;
  transform: translate(0,-50%);
}
.banner-next,
.banner-previous,
.banner-next-wrapper,
.banner-previous-wrapper {
  position: absolute;
  top: 50%;
  z-index: -10;
}
.banner-next-wrapper,
.banner-previous-wrapper {
  width: 300px;
  height: 210px;
  background: transparent;
}
// buttons
.banner-next,
.banner-previous {
  top:50%;
  width: 40px;
  height: 60px;
  background: url(/static/btn.png);
  z-index: -1;
}
.banner-next {
  background-position-x: 40px;
}
.banner-next:hover,
.banner-previous:hover {
  opacity: 0.5;
}
.banner-previous.active {
  transform: translate(-100%,-50%);
}
.banner-previous:not(.active) {
  transform: translate(0,-50%);
}
.banner-next.active {
  left: 100%;
  transform: translate(0,-50%);
}
.banner-next:not(.active) {
  left: 100%;
  transform: translate(-100%,-50%);
}
</style>
