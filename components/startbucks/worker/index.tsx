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
  function askNotificationPermission() {
    console.log('권한 묻기');
    // 권한을 실제로 요구하는 함수

    // 브라우저가 알림을 지원하는지 확인
    if (!('Notification' in window)) {
      console.log('이 브라우저는 알림을 지원하지 않습니다.');
    } else {
      Notification.requestPermission().then((permission) => {
        if (Notification.permission !== 'denied') {
          alert('알람을 허용하고 진행사항을 알람 받으세요');
        } else {
          alert('알람을 허용했습니다.');
        }
      });
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
