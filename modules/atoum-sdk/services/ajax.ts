import { RequestHeaders, RequestOptions, UploadOptions } from '../types';
import globals from '../globals';

type XMLHttpRequestWithEvents = XMLHttpRequest & {
  onload: () => void;
  onreadystatechange: () => void;
  onabort: () => void;
  onerror: () => void;
  ontimeout: () => void;
};

const ajax = (
  requestOptions: RequestOptions,
  callback: Function,
  uploadOptions: UploadOptions = {},
): XMLHttpRequestWithEvents => {
  const xhr = new globals.window.XMLHttpRequest() as XMLHttpRequestWithEvents;

  Object.keys(uploadOptions).forEach((uploadOption: string) => {
    xhr.upload.addEventListener(uploadOption, uploadOptions[uploadOption]);
  });

  const { body, headers, method, url } = requestOptions;

  xhr.open(method, url, true);

  Object.keys(headers).forEach((headerName: string) => {
    xhr.setRequestHeader(headerName, headers[headerName as keyof RequestHeaders] as string);
  });

  let hasCalledCallback = false;

  const ajaxCallback =
    (responseStatus: number | null, responseText?: string | null) => (): void => {
      if (hasCalledCallback) {
        return;
      }

      const statusCode = xhr.status === undefined ? responseStatus : xhr.status;

      const response =
        xhr.status === 0 ? 'Error' : xhr.response || xhr.responseText || responseText;

      callback(statusCode, response, xhr);

      hasCalledCallback = true;
    };

  const success = ajaxCallback(200);

  xhr.onload = success;

  xhr.onreadystatechange = () => xhr.readyState === 4 && success();

  xhr.onabort = ajaxCallback(null, 'Abort');
  xhr.onerror = ajaxCallback(null, 'Error');
  xhr.ontimeout = ajaxCallback(null, 'Timeout');

  xhr.send(body);

  return xhr;
};

export default ajax;
