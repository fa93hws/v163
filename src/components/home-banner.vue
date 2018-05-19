<template>
  <div v-bind:class="['banner-container center',sizeClass]">
    <!-- loading spinner -->
    <loading-spinner 
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
          <loading-spinner 
            class = 'banner-image loading vertical-center center'
            v-show="!imgLoaded[idx]"
          />
          <img
            class = 'banner-image'
            v-bind:src="imgUrls[idx]"
            v-show="imgLoaded[idx]"
            @load="imgLoaded[idx] = true"
          />
          <!-- image description -->
          <div class = 'banner-image-description-wrapper'>
            <span class = 'barnner-image-description'>
              {{imgDesc[idx]}}
            </span>
          </div>
          <!-- image description -->
        </div>
      </div>
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
      <ul class='banner-control-item-group'>
        <li
          v-for="n in imgUrls.length - 2"
          v-bind:key="n"
          v-bind:class="['banner-control-item clickable',{'active':currentRealImgIdx===n-1}]"
          @mousedown="jumpTo(n)"
        >
        </li>
      </ul>
    </div>
    <!-- end fo frame -->
  </div>
</template>

<script lang="ts">
// type
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { BannerImgsReply } from '../types';
import { Getter } from 'vuex-class';

import Vue from 'vue';
import LoadingSpinner from './loading-spinner.vue';
import { HomeApis } from '../api/home-api';
import LazyImg from './lazy-img.vue';

@Component({
  components: {
    LoadingSpinner
  }
})
export default class HomeBanner extends Vue {
  $refs!: {
    carousel: HTMLElement
  };
  // data
  imgUrls: string[] = [];
  imgDesc: string[] = [];
  receiveResponse: boolean = false;
  imgLoaded: boolean[] = [];
  currentImgIdx: number = 1;
  currentRealImgIdx: number = 0;
  isControlButtonShown: boolean = false;
  // computed
  get numImg (): number { return this.imgUrls.length; }
  get imgWidth (): number { return this.sizeClass === 'large' ? 600 : 460; }
  @Getter('Dimension/classNameTwo') sizeClass!: string;
  // methods
  prepareCarousel (): void {
    this.$refs.carousel.style.width = this.imgWidth * this.numImg + 'px';
  }
  next (): void {
    if (this.currentImgIdx === this.imgUrls.length - 1) {
      this.resetToFirst();
    } else {
      this.currentImgIdx++;
    }
  }
  previous (): void {
    if (this.currentImgIdx === 0) {
      this.resetToLast();
    } else {
      this.currentImgIdx--;
    }
  }
  resetToFirst (): void {
    this.$refs.carousel.classList.remove('animate');
    this.currentImgIdx = 1;
    this.$nextTick(() => {
      this.$refs.carousel.classList.add('animate');
      this.currentImgIdx++;
    });
  }
  resetToLast (): void {
    this.$refs.carousel.classList.remove('animate');
    this.currentImgIdx = this.imgUrls.length - 2;
    this.$nextTick(() => {
      this.$refs.carousel.classList.add('animate');
      this.currentImgIdx--;
    });
  }
  doTransform (): void {
    this.$refs.carousel.style.transform = 'translateX(-' + this.currentImgIdx * this.imgWidth + 'px)';
  }
  jumpTo (idx: number) {
    this.currentImgIdx = idx;
  }
  async fetchImgs () {
    HomeApis.fetchBannerImgs().then((data: BannerImgsReply) => {
      this.imgUrls = [data.img[data.img.length - 1], ...data.img, data.img[0]];
      this.imgDesc = [data.description[data.description.length - 1], ...data.description, data.description[0]];
      this.imgLoaded.push.apply(this.imgLoaded,Array(this.imgUrls.length).fill(false));
      this.receiveResponse = true;
      this.$nextTick(() => {
        this.prepareCarousel();
      });
    }).catch((error: any) => {
      console.log(error);
      this.receiveResponse = true;
    });
  }
  @Watch('currentImgIdx')
  onIdxChange (after: number, before: number) {
    this.doTransform();
    if (after === 0) {
      this.currentRealImgIdx = this.imgUrls.length - 3;
    } else if (after === this.imgUrls.length - 1) {
      this.currentRealImgIdx = 0;
    } else {
      this.currentRealImgIdx = after - 1;
    }
  }
  @Watch('sizeClass')
  onSizeChange (after: string, before: string) {
    this.prepareCarousel();
    this.doTransform();
  }
  mounted (): void {
    this.fetchImgs();
  }
}
</script>

<style lang="less" scoped>
.banner-container.medium {
  width: 460px;
  height: 230px;
  .banner-frame,
  .banner-image,
  .banner-image-wrapper {
  width: 460px;
  height: 230px;
  }
  .banner-carousel {
    transform: translateX(-460px);
    height: 230px;
  }
  .banner-next-wrapper,
  .banner-previous-wrapper {
    width: 110px;
    height: 160px;
  }
  .banner-control-item-group {
    right: 10px;
    bottom: 10px;
  }
  .banner-image-description-wrapper {
    width: 424px;
  }
  .barnner-image-description {
    margin-top: 60px;
    font-size: 16px;
  }
}
.banner-container.large {
  width: 600px;
  height: 300px;
  .banner-frame,
  .banner-image,
  .banner-image-wrapper {
    width: 600px;
    height: 300px;
  }
  .banner-carousel {
    transform: translateX(-600px);
    height: 300px;
  }
  .banner-next-wrapper,
  .banner-previous-wrapper {
    width: 300px;
    height: 210px;
  }
  .banner-control-item-group {
    right: 20px;
    bottom: 15px;
  }
  .banner-image-description-wrapper {
    bottom: 0;
    padding: 0 18px 0px 18px;
    width: 564px;
  }
  .barnner-image-description {
    margin-top: 52px;
    font-size: 20px;
  }
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
// images
.banner-image.loading {
  position: relative;
  transform: translateY(-50%);
}
.banner-image-wrapper {
  display: inline-block;
}
.banner-image-description-wrapper {
  position: absolute;
  bottom: 0;
  background: url(/static/text_bg.png) bottom no-repeat;
  padding: 0 18px 0px 18px;
  z-index: 20;
  height: 94px;
}
.barnner-image-description {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #f0f0f0;
  max-width: 70%;
  font-family: "Microsoft Yahei";
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
// jump control
.banner-control-item-group {
  display: block;
  position: absolute;
  text-align: center;
  z-index: 20;
}
.banner-control-item:not(.active) {
  width: 4px;
  background-color: #c0c0c1;
}
.banner-control-item.active {
  width: 20px;
  background-color: #f33;
}
.banner-control-item {
  height: 4px;
  display: inline-block;
  transition: all .3s ease-in-out;
  margin: 0 4px;
}
</style>
