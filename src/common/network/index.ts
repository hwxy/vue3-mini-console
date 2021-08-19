import axios from "axios";
import { request, requestError } from "./interceptors/reques";
import { response, responseError } from "./interceptors/response";

const instance = axios.create({
  baseURL: window.location.origin
});

const CancelToken = axios.CancelToken;
//暂时没想好要不要用cancelTotal
export const cancelTotal: object[] = [];

interface CancelData {
  url: string;
  cancel?: any;
}

export const apiGet = (url: string, params = {}): Promise<any> => {
  const cancelData: CancelData = {
    url: ""
  };

  cancelData.url = url;
  return instance.get(url, {
    params,
    cancelToken: new CancelToken(c => {
      cancelData.cancel = c;
      cancelTotal.push(cancelData);
    })
  });
};
export const apiPost = (url: string, params = {}) => {
  const cancelData: CancelData = {
    url: ""
  };
  cancelData.url = url;
  return instance.post(url, {
    ...params
  });
};
export const apiPut = (url: string, params = {}) => {
  const cancelData: CancelData = {
    url: ""
  };
  cancelData.url = url;
  return instance.put(url, {
    ...params
  });
};
export const apiDelete = (url: string, params = {}) => {
  const cancelData: CancelData = {
    url: ""
  };
  cancelData.url = url;
  return instance.delete(url, {
    ...params
  });
};

instance.interceptors.request.use(request, requestError);
instance.interceptors.response.use(response, responseError);

export default instance;
