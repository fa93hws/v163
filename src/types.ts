export interface RootState {
}
export enum VideoType {
  live = 1,
  record = 2,
  trailer = 3
}
export interface VideoInfo {
  imgUrl: string;
  title: string;
  numAudience: number;
  href: string;
  // status: number;
  type: VideoType;
}
