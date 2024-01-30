'use client';

import {
  registerPushNotifications,
  unregisterPushNotifications,
} from '@/components/startbucks/notifications/push-service';
import { registerServiceWorker } from '@/utils/service-worker';
import { useEffect, useState } from 'react';

export default function ServiceWorker() {
  const [isSubscribed, setIsSubscribed] = useState<boolean>();
  // const [subscription, setSubscription] = useState<any>(null);

  async function callPushNotifications(subscription: PushSubscription) {
    await fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        subscription,
      }),
    });
  }

  async function sendPushNotificationEnabled(enabled: boolean) {
    try {
      if (enabled) {
        const subscription = await registerPushNotifications();
        callPushNotifications(subscription);
      } else {
        await unregisterPushNotifications();
      }
      setIsSubscribed(!!enabled);

      if (isSubscribed === undefined) return null;
    } catch (error) {
      if (enabled && Notification.permission === 'denied') {
        alert('Please enable push notifications in your browser settings');
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  }

  useEffect(() => {
    async function setUpServiceWorker() {
      try {
        await registerServiceWorker();
        // askNotificationPermission();
      } catch (error) {
        console.log(error);
      }
    }

    //서비스 워커 만들기
    setUpServiceWorker();

    //알람 허용하면  푸시알람 구독생성
    sendPushNotificationEnabled(true);
    //생성된 푸시알람 구독 서버 쪽에 알려주고 서버에서 인터벌로 5초,10초,15초 간격으로 3번 알람 보내기
  }, []);

  return <div></div>;
}
