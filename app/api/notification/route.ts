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
  // console.log('Received push subscription to add: ', subscription);

  webPush
    .sendNotification(
      subscription,
      JSON.stringify({
        title: 'Hello Web Push',
        body: 'Your web push notification is here!',
      })
    )
    .then((response) => {
      console.log(response);
    });

  return Response.json({ status: 200 });
}
