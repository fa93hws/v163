// ContainerWidth.ts
import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { RootState } from '../types';
// types
export interface Dimension {
  windowWidth: number;
  rightNavWidth: number;
  liveMainWidth: number;
  livePlayerWidth: number;
  livePlayerHeight: number;
  className: string;
}

// state
export const state: Dimension = {
  windowWidth: 0,
  rightNavWidth: 0,
  liveMainWidth: 0,
  livePlayerWidth: 0,
  livePlayerHeight: 0,
  className: 'large',
};

// getters
export const getters: GetterTree<Dimension, RootState> = {
  rightNavWidth (state): number {
    return state.rightNavWidth;
  },
  liveMainWidth: function (state): number {
    return state.liveMainWidth;
  },
  windowWidth: function (state): number {
    return state.windowWidth;
  },
  livePlayerDimension: function (state): number[] {
    return [state.livePlayerWidth, state.livePlayerHeight];
  },
  className: function(state): string {
    return state.className;
  }
};

// actions
export const actions: ActionTree<Dimension, RootState> = {
  onWindowResize: function({commit}): void {
    commit('updateDimensions', window.innerWidth);
  }
};

// mutations
export const mutations: MutationTree<Dimension> = {
  updateDimensions: function(state, windowWidth: number): void {
    state.windowWidth = windowWidth;
    if (windowWidth >= 1900) {
      state.className = 'large';
      state.rightNavWidth = 420;
      state.livePlayerWidth = 960;
      state.livePlayerHeight = 540;
    } else{
      state.className = windowWidth >= 1600 ? 'medium' : 'small';
      state.rightNavWidth = 320;
      state.livePlayerWidth = 640;
      state.livePlayerHeight = 360;
    }
    state.liveMainWidth = windowWidth - state.rightNavWidth + 5;
  }
};

// export
export const Dimension: Module<Dimension, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
