export default function getURL(path: string) {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL!;

  return new URL(path, baseURL).toString();
}
