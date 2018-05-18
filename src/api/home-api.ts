import axios from 'axios';

interface IHomeApis {
  baseUrl: string;
  fetchBannerImgs: () => Promise<any>;
}
// type
export const HomeApis: IHomeApis = {
  baseUrl: 'https://www.easy-mock.com/mock/5af68f27eecc191f0f5604a0/tv',
  fetchBannerImgs (): Promise<any> {
    let url: string = this.baseUrl + '/homebanner';
    return axios.get(url);
  }
}
