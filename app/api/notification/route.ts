import webPush from 'web-push';

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY as string,
  process.env.WEB_PUSH_PRIVATE_KEY as string
);
export async function POST(req: Request) {
  const { subscription } = await req.json();
  if (!subscription) {
    return Response.json(
      { error: 'Missing push subscription in body' },
      { status: 400 }
    );
  }

  webPush.sendNotification(
    subscription,
    JSON.stringify({
      title: 'Starbucks',
      body: '매장에서 주문을 확인중 입니다.',
      icon: '/logo_starbucks.svg',
    })
  );

  return Response.json({ status: 200 });
}
