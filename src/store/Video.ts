import * as raw from './fakedata.json';
// video.ts
import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { RootState, VideoInfo, VideoType,TrailerInfo } from '../types';
import moment from 'moment';

// types
export interface Video {
  lives: VideoInfo[];
  records: VideoInfo[];
  trailers: TrailerInfo[];
  selectedIdx: number;
  selectedType: VideoType;
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
  trailerList (state): TrailerInfo[] {
    return state.trailers;
  },
  trailerIdxByDay (state,getters): number[] {
    let sortedList = getters.trailerList;
    // timestamp in second
    // beginning of the day for the first video
    let startMoment: moment.Moment = sortedList[0].timeOnAir;
    let secondsInDay: number = 24 * 3600;
    let out: number[] = [0];
    for (let i = 1; i < sortedList.length; i++) {
      let t: TrailerInfo = sortedList[i];
      if (!startMoment.isSame(t.timeOnAir,'d')) {
        out.push(i);
        startMoment = t.timeOnAir;
      }
    }
    if (out[out.length-1] != sortedList.length-1)
      out.push(sortedList.length-1);
    return out;
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
    // get time on air
    trailerList = trailerList.map(function (video: any): VideoInfo {
      return { ...video,
        'timeOnAir': moment(video.date + ' ' + video.time,'YYYY-MM-DD HH:mm')
      };
    });
    // sort
    trailerList.sort(function (t1: TrailerInfo, t2: TrailerInfo): number {
      return t1.timeOnAir.unix() - t2.timeOnAir.unix();
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
