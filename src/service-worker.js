import workbox from "workbox-core";
import precaching from "workbox-precaching";

workbox.skipWaiting();
workbox.clientsClaim();
precaching.precacheAndRoute(self.__precacheManifest);
