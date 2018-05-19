import { RootState,LoadStatus,DispatchStatus,NewImgPayload } from '../types';
import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';

interface LazyStore {
  loadStatusList: LoadStatus[];
  imgElementList: HTMLElement[];
  unloadedList: Set<number>;
}
const state: LazyStore = {
  loadStatusList: [],
  imgElementList: [],
  unloadedList: new Set([])
};

const getters: GetterTree<LazyStore, RootState> = {
  unloadedList (state): number[] {
    return Array.from(state.unloadedList);
  },
  isAllLoaded (state): boolean {
    if (state.loadStatusList.filter((x) => x === LoadStatus.loaded).length === state.loadStatusList.length) {
      return true;
    } else {
      return false;
    }
  },
  numImgs (state): number {
    return state.loadStatusList.length;
  },
  getStatus (state): (idx: number) => LoadStatus {
    return (idx) => {
      return state.loadStatusList[idx];
    };
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
    newSeenImg.forEach((idx: number) => {
      state.loadStatusList[idx] = LoadStatus.loading;
      state.unloadedList.delete(idx);
    });
  },
  updateStatus (state, payload: DispatchStatus): void {
    state.loadStatusList[payload.idx] = payload.status;
  },
  mountNewImg (state, payload: NewImgPayload): void {
    state.imgElementList.push(payload.element);
    state.loadStatusList.push(LoadStatus.notSeen);
    state.unloadedList.add(state.imgElementList.length - 1);
  }
};

export const LazyStore: Module<LazyStore,RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
