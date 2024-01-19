'use client';

import useActionStore from '@/store/store-action';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function RouteChangeListener() {
  const pathname = usePathname();
  const [visited, setVisited] = useState<string[]>([]);
  const { isCalling, handleIsCalling } = useActionStore();

  useEffect(() => {
    if (!visited.find((vi) => vi === pathname)) {
      //방문한 route 기록
      setVisited(() => [...visited, pathname]);
      //프로그래스바 UI
      handleIsCalling(true);
    }
  }, [pathname]);

  return (
    <div className="fixed w-screen origin-left-right top-0 z-50">
      {isCalling && (
        <div>
          <div className="h-1.5 bg-white overflow-hidden">
            <div
              className={`${'animate-progress'} h-full bg-seagreen origin-left-right`}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
