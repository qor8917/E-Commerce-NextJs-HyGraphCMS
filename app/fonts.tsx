import localFont from 'next/font/local';

export const soDoFont = localFont({
  src: [
    {
      path: '../public/fonts/SoDoSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SoDoSans-SemiBold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-SoDo',
});
