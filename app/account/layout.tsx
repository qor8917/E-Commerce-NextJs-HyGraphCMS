import Footer from '@/components/startbucks/footer';
import { ReactNode } from 'react';

export default function AccountLayOut({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
