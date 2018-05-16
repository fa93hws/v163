import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '../types';
import { Dimension } from './Dimension';
import { Video } from './Video';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
  },
  modules: {
    Dimension,
    Video,
  }
};

export default new Vuex.Store<RootState>(store);
