import { getReadyServiceWorker } from '@/utils/service-worker';

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
  const sw = await getReadyServiceWorker();
  return sw.pushManager.getSubscription();
}

export async function registerPushNotifications() {
  if (!('PushManager' in window)) {
    throw Error('PushManager is not available');
  }
  const existingPushSubscription = await getCurrentPushSubscription();

  if (existingPushSubscription) {
    return existingPushSubscription;
  }
  const sw = await getReadyServiceWorker();
  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  });
  return subscription;
}

export async function unregisterPushNotifications() {
  const existingPushSubscription = await getCurrentPushSubscription();
  if (!existingPushSubscription) {
    throw Error('No existing push subscription found');
  }
}
export async function sendPushSubscriptionToServer(
  subscription: PushSubscription
) {
  const response = await fetch('/api/register-push', {
    method: 'POST',
    body: JSON.stringify(subscription),
  });

  if (!response.ok) {
    throw Error('Failed to send push subscription to server');
  }
}
