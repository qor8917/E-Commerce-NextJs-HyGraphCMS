import getAllCollections from '@/hygraph/get-all-collections';
import { Collection } from '@/types/types';
import { MetadataRoute } from 'next';

type Route = {
  url: string;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}`
  : 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const collections: Collection[] = await getAllCollections();
  const categories = collections
    .map((collection) =>
      collection.categories.map((category) => ({
        url: `${baseUrl}/menu/${category.slug}`,
      }))
    )
    .flat();

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = [...categories];
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...fetchedRoutes];
}
