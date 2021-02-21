import { HttpMethod } from '../types';
import Request from './Request';

export const ROOT_URL = 'https://atoum.thot-sgb.fr';

class ClientApi {
  rootUrl: string;

  language: string;

  constructor({language = 'fr', rootUrl = ROOT_URL} = {}) {
    this.language = language;
    this.rootUrl = rootUrl;
  }

  createGetRequest(path: string, RequestClass = Request) {
    return this.createRequest(path, 'GET', RequestClass);
  }

  createPatchRequest(path: string, RequestClass = Request) {
    return this.createRequest(path, 'PATCH', RequestClass);
  }

  createPostRequest(path: string, RequestClass = Request) {
    return this.createRequest(path, 'POST', RequestClass);
  }

  createPutRequest(path: string, RequestClass = Request) {
    return this.createRequest(path, 'PUT', RequestClass);
  }

  createDeleteRequest(path: string, RequestClass = Request) {
    return this.createRequest(path, 'DELETE', RequestClass);
  }

  createRequest(path: string, method: HttpMethod, RequestClass = Request) {
    return new RequestClass(this.getCompleteUrl(path), method, this.language);
  }

  getCompleteUrl(path: string) {
    return this.rootUrl + path;
  }
}

export default ClientApi;
