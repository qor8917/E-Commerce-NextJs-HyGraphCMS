export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worekrs are not supported by this browser');
  }
  await navigator.serviceWorker.register('/sw.js');
}

export async function getReadyServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worekrs are not supported by this browser');
  }
  return navigator.serviceWorker.ready;
}
