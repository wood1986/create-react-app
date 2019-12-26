import {clientsClaim, skipWaiting} from "workbox-core";
import {precacheAndRoute} from "workbox-precaching";
import uuidv4 from "uuid/v4";

uuidv4(null, [], 0);

skipWaiting();
clientsClaim();
// eslint-disable-next-line no-undef
precacheAndRoute(__precacheManifest__);
