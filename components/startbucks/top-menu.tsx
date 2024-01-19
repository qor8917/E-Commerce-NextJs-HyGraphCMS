'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function TopMenu() {
  const paths = useSearchParams().get('path')?.split('/') ?? [];
  const lastPath = usePathname().split('/').reverse()[0];
  const combinedPaths: any[] = [];
  paths.reduce((acc, cur) => {
    const result = acc + '/' + cur;
    combinedPaths.push(result);
    return result;
  }, '') ?? '';
  return (
    <div className="cursor-pointer whitespace-nowrap border border-solid border-[color:#EDEBE9] bg-stone-50 px-32 py-3.5 text-sm capitalize leading-5 tracking-normal  text-black text-opacity-90 max-lg:px-5 ">
      {paths.map((path: string, index) => (
        <Link key={index} href={combinedPaths[index].substring(1) ?? ''}>
          {path}&nbsp;/&nbsp;
        </Link>
      ))}
      <span className="font-bold">{lastPath}</span>
    </div>
  );
}
