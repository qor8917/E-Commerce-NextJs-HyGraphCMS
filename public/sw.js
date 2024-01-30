const sw = /** @type {ServiceWorkerGlobalScope & typeof globalThis} */ (
  globalThis
);
sw.addEventListener('push', (event) => {
  const massege = event.data?.json();
  const { title, body, icon, image } = massege;
  async function handlePushEvent() {
    const windowClients = await sw.clients.matchAll({ type: 'window' });
    if (windowClients.length > 0) {
      windowClients[0].postMessage({ data: 'aaa' });
    }

    await sw.registration.showNotification(title, {
      body,
      renotify: true,
      tag: 'sss',
      icon,
    });
  }
  event.waitUntil(handlePushEvent());
});
