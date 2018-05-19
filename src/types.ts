import moment from 'moment';
export interface RootState {
}
export enum VideoType {
  live = 0,
  record = 1,
  trailer = 2
}
export interface VideoInfo {
  imgUrl: string;
  title: string;
  numAudience: number;
  href: string;
  type: VideoType;
}
export interface TrailerInfo extends VideoInfo {
  timeOnAir: moment.Moment;
}
// api
export interface BannerImgsReply {
  img: string[];
  success: boolean;
  description: string[];
}
// lazy store
export enum LoadStatus {
  notSeen = 0,
  loading = 1,
  loaded = 2,
  failed = 3
}
export interface DispatchStatus {
  idx: number;
  status: LoadStatus;
}
export interface NewImgPayload {
  element: HTMLElement;
}
// bottom program
export enum ProgramType {
  live = 0,
  soon = 1,
  review = 2
}
export interface ProgramCard {
  imgUrl: string;
  title: string;
  numAudience: number;
  type: ProgramType;
  multiSource: boolean;
  href: string;
}
