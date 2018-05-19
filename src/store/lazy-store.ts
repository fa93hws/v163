import { RootState,LoadStatus,DispatchStatus,NewImgPayload } from '../types';
import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';

interface LazyStore {
  loadStatusList: LoadStatus[];
  imgElementList: HTMLElement[];
  unloadedSet: Set<number>;
}

const state: LazyStore = {
  loadStatusList: [],
  imgElementList: [],
  unloadedSet: new Set([])
};

const getters: GetterTree<LazyStore, RootState> = {
  unloadedList (state): number[] {
    return Array.from(state.unloadedSet);
  },
  isAllLoaded (state): boolean {
    return state.unloadedSet.size === 0 ? true : false;
  },
  numImgs (state): number {
    return state.loadStatusList.length;
  },
  getStatus (state): (idx: number) => LoadStatus {
    return (idx) => {
      return state.loadStatusList[idx];
    };
  },
  statusList (state): LoadStatus[] {
    return state.loadStatusList;
  }
};

const actions: ActionTree<LazyStore, RootState> = {
  updateVisibleStatus ({ commit,state }) {
    let seeHeight: number = document.documentElement.clientHeight;
    let scrollTop: number = document.documentElement.scrollTop || document.body.scrollTop;
    let newSeenImg: number[] = [];
    for (let i = 0; i < state.loadStatusList.length; i++) {
      if (state.loadStatusList[i] !== LoadStatus.notSeen) continue;
      let imgTop: number = state.imgElementList[i].offsetTop;
      if (imgTop < seeHeight + scrollTop) {
        newSeenImg.push(i);
      }
    }
    if (newSeenImg.length > 0) commit('seeImages',newSeenImg);
    // if (img[i].offsetTop < seeHeight + scrollTop) {
  }
};

const mutations: MutationTree<LazyStore> = {
  seeImages (state,newSeenImg): void {
    // console.log('see');
    let temp = state.loadStatusList;
    newSeenImg.forEach((idx: number) => {
      temp[idx] = LoadStatus.loading;
    });
    state.loadStatusList = Array.from(temp);
  },
  mountNewImg (state, payload: NewImgPayload): void {
    // console.log('mount');
    state.imgElementList = [...state.imgElementList, payload.element];
    state.loadStatusList = [...state.loadStatusList, LoadStatus.notSeen];
    let temp: any = state.unloadedSet;
    temp.add(state.imgElementList.length - 1);
    state.unloadedSet = new Set(temp);
  },
  imgLoaded (state, idx: number) {
    // console.log('loaded');
    let temp: any = state.loadStatusList;
    temp[idx] = LoadStatus.loaded;
    state.loadStatusList = Array.from(temp);
    temp = state.unloadedSet;
    temp.delete(idx);
    state.unloadedSet = new Set(temp);
  }
};

export const LazyStore: Module<LazyStore,RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
