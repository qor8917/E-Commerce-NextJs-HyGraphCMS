const sw = /** @type {ServiceWorkerGlobalScope & typeof globalThis} */ (
  globalThis
);
sw.addEventListener('push', (event) => {
  const massege = event.data?.json();
  const { title, body } = massege;
  console.log('Received message: ', massege);
  async function handlePushEvent() {
    // const windowClients = await sw.clients.matchAll({ type: 'window' });
    // if (windowClients.length > 0) {
    //   const appInForeground = windowClients.some((client) => client.focused);
    //   if (appInForeground) {
    //     console.log("App is in foreground, don't show notification");
    //     return;
    //   }
    // }

    await sw.registration.showNotification(title, {
      body,
      renotify: true,
      tag: 'sss',
    });
  }
  event.waitUntil(handlePushEvent());
});
