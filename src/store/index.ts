import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '../types';
import { Dimension } from './dimension';
import { Video } from './video';
import { LazyStore } from './lazy-store';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
  },
  modules: {
    Dimension,
    Video,
    LazyStore
  }
};

export default new Vuex.Store<RootState>(store);
