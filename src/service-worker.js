import {clientsClaim, skipWaiting} from "workbox-core";
import {precacheAndRoute} from "workbox-precaching";

skipWaiting();
clientsClaim();
// eslint-disable-next-line no-undef
precacheAndRoute(__precacheManifest__);
