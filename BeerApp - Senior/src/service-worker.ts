/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from "workbox-strategies";
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { imageCache, staticResourceCache, googleFontsCache } from 'workbox-recipes';

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', () => {
  self.skipWaiting();
});
clientsClaim();

webpackAssetsCache();

navigationCache();

// https://developer.chrome.com/docs/workbox/modules/workbox-recipes#google_fonts_cache
googleFontsCache();

// https://developer.chrome.com/docs/workbox/modules/workbox-recipes#static_resources_cache
staticResourceCache();

// https://developer.chrome.com/docs/workbox/modules/workbox-recipes#image_cache
imageCache();

apiCache();

function webpackAssetsCache() {
  const precacheAssets = [
    { url: '/manifest.json', revision: new Date().getTime().toString().concat('manifest-json') },
  ].concat(self.__WB_MANIFEST as any);
  precacheAndRoute(precacheAssets);
}

function navigationCache() {
  // return index.html for all navigation requests.
  // https://developer.chrome.com/docs/workbox/modules/workbox-routing#how_to_register_a_navigation_route
  const handler = createHandlerBoundToURL('/index.html');
  const navigationRoute = new NavigationRoute(handler);
  registerRoute(navigationRoute);
}

function apiCache() {
  registerRoute(
    new RegExp(`${process.env.REACT_APP_API}.*`),
    new NetworkFirst({
      cacheName: 'openbrewerydb-apis',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24,
          maxEntries: 100,
        }),
      ],
    })
  );
}
