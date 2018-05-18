import axios from 'axios';

export interface BannerImgsReply {
  urls: string[];
  success: boolean;
}
interface IHomeApis {
  baseUrl: string;
  fetchBannerImgs: () => Promise<any>;
}
// type
export const HomeApis: IHomeApis = {
  baseUrl: 'https://www.easy-mock.com/mock/5af68f27eecc191f0f5604a0/tv',
  fetchBannerImgs (): Promise<any> {
    let url: string = this.baseUrl + '/homebanner_f';
    return axios.get(url);
  }
}
