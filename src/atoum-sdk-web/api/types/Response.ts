import ResponseBody from './ResponseBody';
import ResponseHeaders from './ResponseHeaders';

type Response = {
  body: ResponseBody,
  statusCode: number;
  responseHeaders: ResponseHeaders;
  links?: Record<string, { title: string, href: string }>
};

export default Response;
