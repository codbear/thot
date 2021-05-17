import { HttpMethod, RequestBody } from '../types';
import { API_ROUTES, CLIENT_ID, CLIENT_ROUTES } from '../constants';

import Request from './Request';
import Authenticator from './Authenticator';

class ClientApi extends Authenticator {
  private readonly clientRootUrl: string;

  private readonly clientLoginUrl: string;

  private readonly language: string;

  private readonly apiRootUrl: string;

  private readonly authorizeUrl: string;

  constructor(
    clientId: string = CLIENT_ID,
    {
      clientRootUrl = CLIENT_ROUTES.ROOT_URL,
      clientLoginPath = CLIENT_ROUTES.LOGIN_PATH,
      language = 'fr',
      apiRootUrl = API_ROUTES.ROOT_URL,
      authorizePath = API_ROUTES.AUTHORIZE_PATH,
      refreshTokenPath = API_ROUTES.REFRESH_TOKEN_PATH,
    } = {},
  ) {
    super(clientId, apiRootUrl + refreshTokenPath);

    this.clientRootUrl = clientRootUrl;
    this.clientLoginUrl = clientRootUrl + clientLoginPath;

    this.language = language;

    this.apiRootUrl = apiRootUrl;
    this.authorizeUrl = apiRootUrl + authorizePath;
  }

  public login(credentials: RequestBody) {
    const authRequest = new Request(this.authorizeUrl, 'POST');

    return authRequest
      .setBodyParams(credentials)
      .execute()
      .then(({ body }) => {
        this.setJwtToken({
          jwtToken: body.token,
          refreshToken: body.refreshToken,
          expiresIn: 3600,
        });

        return {
          jwtToken: this.jwtToken,
          refreshToken: this.refreshToken,
        };
      });
  }

  public createGetRequest(path: string, RequestClass = Request) {
    return this.createRequest(path, 'GET', RequestClass);
  }

  public createPostRequest(path: string, RequestClass = Request) {
    return this.createRequest(path, 'POST', RequestClass);
  }

  public createPatchRequest(path: string, RequestClass = Request) {
    return this.createRequest(path, 'PATCH', RequestClass);
  }

  public createPutRequest(path: string, RequestClass = Request) {
    return this.createRequest(path, 'PUT', RequestClass);
  }

  public createDeleteRequest(path: string, RequestClass = Request) {
    return this.createRequest(path, 'DELETE', RequestClass);
  }

  private createRequest(path: string, method: HttpMethod, RequestClass = Request) {
    this.checkAuthentication(this.clientLoginUrl);

    const url = this.getCompleteUrl(path);

    return new RequestClass(url, method, this.language);
  }

  private getCompleteUrl(path: string) {
    return this.apiRootUrl + path;
  }
}

export default ClientApi;
