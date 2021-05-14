import localStorage from 'local-storage-fallback';
import globals from '../globals';
import { STORAGE_KEYS } from '../constants';

class Authenticator {
  private readonly clientId: string;

  private readonly clientSecret: string;

  protected jwtToken: string;

  protected refreshToken: string;

  protected jwtTokenExpiration: number;

  private refreshTokenUrl: string;

  constructor(clientId: string, clientSecret: string, refreshTokenUrl: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.refreshTokenUrl = refreshTokenUrl;
    this.jwtToken = this.getStorageItem(STORAGE_KEYS.JWT_TOKEN) || null;
    this.refreshToken = this.getStorageItem(STORAGE_KEYS.REFRESH_TOKEN) || null;
    this.jwtTokenExpiration = +this.getStorageItem(STORAGE_KEYS.JWT_TOKEN_EXPIRATION) || null;
  }

  protected setJwtToken({ jwtToken = '', refreshToken = '', expiresIn = 0 } = {}): this {
    this.jwtToken = jwtToken;
    this.refreshToken = refreshToken;
    this.jwtTokenExpiration = Date.now() + expiresIn * 1000;

    if (jwtToken) {
      this.setStorageItem(STORAGE_KEYS.JWT_TOKEN, jwtToken);
    } else {
      this.removeStorageItem(STORAGE_KEYS.JWT_TOKEN);
    }

    if (refreshToken) {
      this.setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    } else {
      this.removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
    }

    if (expiresIn) {
      this.setStorageItem(STORAGE_KEYS.JWT_TOKEN_EXPIRATION, this.jwtTokenExpiration);
    } else {
      this.removeStorageItem(STORAGE_KEYS.JWT_TOKEN_EXPIRATION);
    }

    return this;
  }

  // eslint-disable-next-line consistent-return
  protected checkAuthentication(clientLoginUrl): void | this {
    if (this.jwtToken && !this.isJwtTokenExpired()) {
      return this;
    }

    if (this.jwtToken && this.isJwtTokenExpired() && this.refreshToken) {
      this.refreshJwtToken();

      return this;
    }

    globals.window.location.href = clientLoginUrl;
  }

  private isJwtTokenExpired(): boolean {
    const fiftyMinutes = 1000 * 60 * 15;

    return Date.now() >= this.jwtTokenExpiration - fiftyMinutes;
  }

  private refreshJwtToken() {}

  private getStorageItem(storageKey): string {
    return localStorage.getItem(this.prependStringWithClientId(storageKey));
  }

  private setStorageItem(storageKey, itemValue): this {
    localStorage.setItem(this.prependStringWithClientId(storageKey), itemValue);

    return this;
  }

  private removeStorageItem(storageKey): this {
    localStorage.removeItem(this.prependStringWithClientId(storageKey));

    return this;
  }

  private prependStringWithClientId(string: string): string {
    return `${this.clientId}__${string}`;
  }
}

export default Authenticator;
