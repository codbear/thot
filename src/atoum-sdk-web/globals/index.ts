/* eslint-env browser */
import btoa from 'btoa';

const isBrowser: boolean = typeof window !== 'undefined';

declare global {
  interface Window {
    Event: typeof Event;
    XMLHttpRequest: typeof XMLHttpRequest;
  }
}

const windowObject: Partial<Window> = isBrowser ? window : {};

export default {
  btoa,
  isBrowser,
  window: windowObject,
  document: windowObject.document,
  Event: windowObject.Event,
};
