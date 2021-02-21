import globals from '../../globals';
import {
  HttpMethod, RequestBody, RequestHeaders, RequestOptions, Response, ResponseHeaders,
} from '../types';
import ajax from '../services';

type Serializable = string|number|boolean;
type ParamCollection = Record<string, Serializable>;

function serialized(jsObject: ParamCollection): string {
  return Object
    .keys(jsObject)
    .map((param) => `${param}=${encodeURIComponent(jsObject[param])}`)
    .join('&');
}

function isStatusOk(statusCode: number): boolean {
  return statusCode >= 200 && statusCode <= 299;
}

function getParsedResponseHeaders(stringifiedResponseHeaders: string): ResponseHeaders {
  const headerSeparator = ': ';

  return stringifiedResponseHeaders
    .split('\n')
    .reduce((headers: ResponseHeaders, stringHeader: string) => {
      const headerSegment = stringHeader.split(headerSeparator);

      if (headerSegment.length < 2) {
        return headers;
      }

      return {
        ...headers,
        [headerSegment[0].toLowerCase()]: headerSegment[1],
      };
    }, {});
}

class Request {
  url: string;

  method: HttpMethod;

  body: RequestBody;

  queryParams: ParamCollection;

  routeParams: ParamCollection;

  uploadOptions: Record<string, Serializable|Function|null>;

  headers: RequestHeaders;

  currentXhr: XMLHttpRequest|null;

  constructor(url: string, method: HttpMethod = 'GET', language: string = 'fr') {
    this.currentXhr = null;
    this.url = url;
    this.method = this.setMethod(method);
    this.body = {};
    this.queryParams = {};
    this.routeParams = {};
    this.uploadOptions = {};
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': language,
    };
  }

  setMethod(method: string): HttpMethod {
    this.method = method.toUpperCase() as HttpMethod;
    return this.method;
  }

  setBodyParam(paramName: string, paramValue: string|number): this {
    (this.body as ParamCollection)[paramName] = paramValue;
    return this;
  }

  setBodyParams(body: RequestBody): this {
    Object.assign(this.body, body);
    return this;
  }

  setRawBody(body: FormData): this {
    this.body = body;
    return this;
  }

  getSerializedBody(): string|FormData {
    // @ts-ignore
    return this.body instanceof globals.window.FormData
      ? this.body as FormData
      : JSON.stringify(this.body);
  }

  setQueryParam(paramName: string, paramValue: string|number): this {
    this.queryParams[paramName] = paramValue;
    return this;
  }

  setQueryParams(queryParams: ParamCollection): this {
    Object.assign(this.queryParams, queryParams);
    return this;
  }

  getSerializedQueryParams(): ReturnType<typeof serialized> {
    return serialized(this.queryParams);
  }

  setUploadOption(optionName: string, optionValue: Function|null): this {
    this.uploadOptions[optionName] = optionValue;
    return this;
  }

  setUploadOptions(uploadOptions: ParamCollection): this {
    Object.assign(this.uploadOptions, uploadOptions);
    return this;
  }

  setHeader(headerName: keyof RequestHeaders, headerValue?: string): this {
    if (headerValue === undefined) {
      delete this.headers[headerName];
    } else {
      this.headers[headerName] = headerValue;
    }

    return this;
  }

  setHeaders(headers: RequestHeaders): this {
    Object.assign(this.headers, headers);
    return this;
  }

  setRouteParam(paramName: string, paramValue: string|number): this {
    this.routeParams[paramName] = paramValue;
    return this;
  }

  setRouteParams(routeParams: ParamCollection): this {
    Object.assign(this.routeParams, routeParams);
    return this;
  }

  getUrl(): string {
    let url = this.url.replace(/\/:([a-zA-Z0-9_]+)/gi, ($0, $1) => (
      this.routeParams[$1] ? `/${this.routeParams[$1]}` : ''
    ));

    const queryParams = this.getSerializedQueryParams();

    if (queryParams) {
      url += `?${queryParams}`;
    }

    return url;
  }

  abort(): boolean {
    if (!this.currentXhr) {
      return false;
    }

    this.currentXhr.abort();
    this.currentXhr = null;

    return true;
  }

  execute(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const requestOptions: RequestOptions = {
        url: this.getUrl(),
        method: this.method,
        headers: this.headers,
        body: this.getSerializedBody(),
      };

      this.currentXhr = ajax(
        requestOptions,
        (statusCode: number, response = '{}', xhr: XMLHttpRequest) => {
          const responseHeaders = getParsedResponseHeaders(xhr.getAllResponseHeaders());

          let body;

          try {
            body = JSON.parse(response);
          } catch (e) {
            body = response;
          }

          const finalResponse: Response = { body, statusCode, responseHeaders };

          if (isStatusOk(statusCode)) {
            resolve(finalResponse);
          } else {
            reject(finalResponse);
          }
        },
      );
    });
  }
}

export default Request;
