import FloorDrawer from '@/components/startbucks/floor-drawer';
import Footer from '@/components/startbucks/footer';
import Loading from '@/components/startbucks/loading';
import { ReactNode, Suspense } from 'react';

export default async function ProductLayOut({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Footer />
      <FloorDrawer />
    </>
  );
}
