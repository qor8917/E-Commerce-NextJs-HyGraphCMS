'use client';
import { useEffect } from 'react';

export default function PushMessageListener() {
  useEffect(() => {
    const messageListener = async (event: MessageEvent) => {
      console.log('Received message from service worker', event.data);
    };

    navigator.serviceWorker.addEventListener('message', messageListener);

    return () =>
      navigator.serviceWorker.removeEventListener('message', messageListener);
  }, []);

  return null;
}
