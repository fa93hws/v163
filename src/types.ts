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
