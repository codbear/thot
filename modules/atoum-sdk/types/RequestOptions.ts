import HttpMethod from './HttpMethod';
import RequestHeaders from './RequestHeaders';

type RequestOptions = {
  url: string;
  method: HttpMethod;
  headers: RequestHeaders;
  body: string | FormData;
};

export default RequestOptions;
