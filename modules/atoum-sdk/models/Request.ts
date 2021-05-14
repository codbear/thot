import globals from '../globals';
import { ajax } from '../services';
import {
  HttpMethod,
  ParamCollection,
  RequestBody,
  RequestHeaders,
  RequestOptions,
  ResponseHeaders,
  UploadOptions,
} from '../types';

const serialized = (jsObject: ParamCollection): string => {
  return Object.keys(jsObject)
    .map((param) => `${param}=${encodeURIComponent(jsObject[param])}`)
    .join('&');
};

const isStatusOk = (statusCode: number): boolean => {
  return statusCode >= 200 && statusCode <= 299;
};

const getParsedResponseHeaders = (stringifiedResponseHeaders: string): ResponseHeaders => {
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
};

class Request {
  private url: string;

  private method: HttpMethod;

  private body: RequestBody;

  private readonly queryParams: ParamCollection;

  private readonly routeParams: ParamCollection;

  private readonly uploadOptions: UploadOptions;

  private currentXhr: XMLHttpRequest | null;

  private readonly headers: RequestHeaders;

  constructor(url: string, method: HttpMethod = 'GET', language: string = 'fr') {
    this.url = url;
    this.method = method;
    this.body = {};
    this.queryParams = {};
    this.routeParams = {};
    this.uploadOptions = {};
    this.currentXhr = null;
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': language,
      'X-Requested-With': 'XMLHttpRequest',
    };
  }

  execute(): Promise<any> {
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

          const finalResponse = { body, statusCode, responseHeaders };

          if (isStatusOk(statusCode)) {
            resolve(finalResponse);
          } else {
            reject(finalResponse);
          }
        },
        this.uploadOptions,
      );
    });
  }

  abort(): boolean {
    if (!this.currentXhr) {
      return false;
    }

    this.currentXhr.abort();
    this.currentXhr = null;

    return true;
  }

  getUrl(): string {
    let url = this.url.replace(/\/:([a-zA-Z0-9_]+)/gi, ($0, $1) =>
      this.routeParams[$1] ? `/${this.routeParams[$1]}` : ``,
    );

    const queryParams = this.getSerializedQueryParams();

    if (queryParams) {
      url += `?${queryParams}`;
    }

    return url;
  }

  setMethod(method: string): this {
    this.method = method.toUpperCase() as HttpMethod;

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

  setRouteParam(paramName: string, paramValue: string | number): this {
    this.routeParams[paramName] = paramValue;

    return this;
  }

  setRouteParams(routeParams: ParamCollection): this {
    Object.assign(this.routeParams, routeParams);

    return this;
  }

  setQueryParam(paramName: string, paramValue: string | number): this {
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

  setUploadOption(optionName: string, optionValue: EventListener): this {
    this.uploadOptions[optionName] = optionValue;

    return this;
  }

  setUploadOptions(uploadOptions: ParamCollection): this {
    Object.assign(this.uploadOptions, uploadOptions);

    return this;
  }

  setBodyParam(paramName: string, paramValue: string | number): this {
    this.body[paramName] = paramValue;

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

  getSerializedBody(): string | FormData {
    return this.body instanceof globals.window.FormData
      ? (this.body as FormData)
      : JSON.stringify(this.body);
  }
}

export default Request;
