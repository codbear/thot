import globals from '../../globals';
import { Request, ClientApi, RequestBody } from '../../api';

class Helper {
  api: any;

  uri: string;

  protected subItemsHelpers: Record<string, typeof Helper> = {};

  constructor(api: ClientApi, uri: string) {
    this.api = api;
    this.uri = uri;
  }

  id(id: number|string) {
    const subHelperUri = this.uri.replace(/\/:id/, `/${id}`);

    return Object.keys(this.subItemsHelpers).reduce((helpers, helperName) => ({
      ...helpers,
      [helperName]: new this.subItemsHelpers[helperName](this.api, subHelperUri),
    }), {});
  }

  create(params: RequestBody = {}): Request|Promise<any> {
    const request = this.api
      .createPostRequest(this.uri)
      .setBodyParams(params);

    return request.execute();
  }

  find(): Request|Promise<any> {
    const request = this.api
      .createGetRequest(this.uri);

    return request.execute();
  }

  get(itemId: number): Request|Promise<any> {
    const request = this.api
      .createGetRequest(this.uri)
      .setRouteParam('id', `${itemId}`);

    return request.execute();
  }

  update(itemId: number, params: RequestBody = {}): Request|Promise<any> {
    const request = this.api
      .createPutRequest(this.uri)
      .setRouteParam('id', `${itemId}`)
      .setBodyParams(params);

    return request.execute();
  }

  partialUpdate(itemId: number, params: RequestBody = {}): Request|Promise<any> {
    const request = this.api
      .createPatchRequest(this.uri)
      .setRouteParam('id', `${itemId}`)
      .setBodyParams(params);

    return request.execute();
  }

  upload(files: File|File[], onProgress: Function|null = null): Request|Promise<any> {
    const filesToUpload = Array.isArray(files) ? files : [files];
    const totalFiles = filesToUpload.length;
    // @ts-ignore
    const formData = new globals.window.FormData();

    filesToUpload.forEach((file, i) => {
      const filename = totalFiles === 1 ? 'uploaded_file' : `uploaded_files[${i}]`;
      formData.append(filename, file);
    });

    const request = this.api
      .createPostRequest(this.uri)
      .setRawBody(formData)
      .setUploadOption('progress', onProgress)
      .setHeader('Content-Type', undefined);

    return request.execute();
  }

  delete(itemId: number): Request|Promise<any> {
    const request = this.api
      .createDeleteRequest(this.uri)
      .setRouteParam('id', `${itemId}`);

    return request.execute();
  }
}

export default Helper;
