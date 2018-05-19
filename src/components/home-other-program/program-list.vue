<template>
  <div class = 'program'>
    <ul>
      <Card />
    </ul>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';

import Vue from 'vue';
import Card from './program-list-card.vue';

@Component({
  components: {
    Card
  }
})
export default class ProgramList extends Vue {

}
</script>

<style lang="less" scoped>
.program {
  width: 1200px;
  margin: 45px auto 0;
  position: relative;
}
</style>
