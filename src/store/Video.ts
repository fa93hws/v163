import * as raw from './fakedata.json';
// video.ts
import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { RootState, VideoInfo } from '../types';

// types
export interface Video {
  lives: VideoInfo[];
  records: VideoInfo[];
  trailers: VideoInfo[];
  selectedIdx: number;
  selectedType: string;
}
interface SelectInfo {
  idx: number;
  typ: string;
}
// state
export const state: Video = {
  lives: [],
  records: [],
  trailers: [],
  selectedIdx: 0,
  selectedType: 'live',
};

// getters
export const getters: GetterTree<Video, RootState> = {
  liveList(state): VideoInfo[] {
    return state.lives;
  },
  recordList(state): VideoInfo[] {
    return state.records;
  },
  trailerList(state): VideoInfo[] {
    return state.trailers;
  },
  selectedIdx(state): number {
    return state.selectedIdx;
  },
  selectedType(state): string {
    return state.selectedType;
  },
  selected(state): VideoInfo {
    switch (state.selectedType) {
      case 'live':
        return state.lives[state.selectedIdx];
      case 'record':
        return state.records[state.selectedIdx];
      default:
        return state.trailers[state.selectedIdx];
    }
  }
};

// actions
export const actions: ActionTree<Video, RootState> = {
  fetchData: function({commit}): void {
    let allVideos = (<any>raw);
    let liveList = allVideos.filter((v: VideoInfo) => v.status==0);
    let recordList = allVideos.filter((v: VideoInfo) => v.status==1);
    let trailerList = allVideos.filter((v: VideoInfo) => v.status==2);
    commit('updateVideos', {liveList, recordList, trailerList});
  },
  selectVideo: function({commit}, selectInfo: SelectInfo): void {
    commit('updateSelect', selectInfo);
  }
};

// mutations
export const mutations: MutationTree<Video> = {
  updateVideos: function (state, videos): void {
    let {liveList , recordList, trailerList} = videos;
    state.lives = liveList;
    state.records = recordList;
    state.trailers = trailerList;
    state.selectedIdx = 0;
    state.selectedType = state.lives.length > 0 ? 'live' : 'record';
  },
  updateSelect: function(state, selectInfo: SelectInfo): void {
    state.selectedIdx = selectInfo.idx;
    state.selectedType = selectInfo.typ;
  }
};

// export
export const Video: Module<Video, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
