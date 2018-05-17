import * as raw from './fakedata.json';
// video.ts
import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { RootState, VideoInfo, VideoType } from '../types';
import * as moment from 'moment';

// types
export interface Video {
  lives: VideoInfo[];
  records: VideoInfo[];
  trailers: Trailer[];
  selectedIdx: number;
  selectedType: VideoType;
}
export interface Trailer extends VideoInfo {
  timeOnAir: moment.Moment;
}
interface SelectInfo {
  idx: number;
  type: VideoType;
}
// state
export const state: Video = {
  lives: [],
  records: [],
  trailers: [],
  selectedIdx: 0,
  selectedType: VideoType.live
};

// getters
export const getters: GetterTree<Video, RootState> = {
  liveList (state): VideoInfo[] {
    return state.lives;
  },
  recordList (state): VideoInfo[] {
    return state.records;
  },
  trailerList (state): Trailer[] {
    return state.trailers;
  },
  sortedTrailerList (state): Trailer[] {
    let trailers = state.trailers.sort(function (t1: Trailer, t2: Trailer): number {
      return t1.timeOnAir.unix() - t2.timeOnAir.unix();
    });
    // let trailers = state.trailers.sort(function (t1: Trailer, t2: Trailer): number) {
    //   return t1.timeOnAir.unix() - t2.timeOnAir.unix();
    // }
    return state.trailers;
  },
  selectedIdx (state): number {
    return state.selectedIdx;
  },
  selectedType (state): VideoType {
    return state.selectedType;
  },
  selected (state): VideoInfo {
    switch (state.selectedType) {
      case VideoType.live:
        return state.lives[state.selectedIdx];
      case VideoType.record:
        return state.records[state.selectedIdx];
      default:
        return state.trailers[state.selectedIdx];
    }
  }
};

// actions
export const actions: ActionTree<Video, RootState> = {
  fetchData: function ({ commit }): void {
    let allVideos = raw as any;
    allVideos.map((v: any) => { v.type = v.status; });
    let liveList = allVideos.filter((v: VideoInfo) => v.type === VideoType.live);
    let recordList = allVideos.filter((v: VideoInfo) => v.type === VideoType.record);
    let trailerList = allVideos.filter((v: any) => v.type === VideoType.trailer);
    // function parseTrailerTime (v: extend VideoInfo) {
    // }
    trailerList = trailerList.map(function (video: any): VideoInfo {
      return { ...video,
        'timeOnAir': moment(video.date + ' ' + video.time,'YYYY-MM-DD HH:mm')
      };
    });
    commit('updateVideos', { liveList, recordList, trailerList });
  },
  selectVideo: function ({ commit }, selectInfo: SelectInfo): void {
    commit('updateSelect', selectInfo);
  }
};

// mutations
export const mutations: MutationTree<Video> = {
  updateVideos: function (state, videos): void {
    let { liveList , recordList, trailerList } = videos;
    state.lives = liveList;
    state.records = recordList;
    state.trailers = trailerList;
    state.selectedIdx = 0;
    state.selectedType = state.lives.length > 0 ? VideoType.live : VideoType.record;
  },
  updateSelect: function (state, selectInfo: SelectInfo): void {
    state.selectedIdx = selectInfo.idx;
    state.selectedType = selectInfo.type;
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
