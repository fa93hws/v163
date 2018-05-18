<template>
  <div class="hollow-dots-spinner">
    <div class="dots-wrapper">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';

import Vue from 'vue';
export default class LoadingSpinner extends Vue {

}
</script>

<style scoped>
.hollow-dots-spinner, .hollow-dots-spinner * {
  background: transparent;
  box-sizing: border-box;
}

.dots-wrapper {
  position: relative;
  width: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.hollow-dots-spinner {
  height: 20px;
  width: calc(40px * 3);
}

.hollow-dots-spinner .dot {
  width: 20px;
  height: 20px;
  margin: 0 calc(20px / 2);
  border: calc(20px / 5) solid red;
  border-radius: 50%;
  float: left;
  transform: scale(0);
  animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;
}

.hollow-dots-spinner .dot:nth-child(1) {
  animation-delay: calc(300ms * 1);
}

.hollow-dots-spinner .dot:nth-child(2) {
  animation-delay: calc(300ms * 2);
}

.hollow-dots-spinner .dot:nth-child(3) {
  animation-delay: calc(300ms * 3);

}

@keyframes hollow-dots-spinner-animation {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
