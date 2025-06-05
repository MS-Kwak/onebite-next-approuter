import Searchbar from '@/components/searchbar';
import { Suspense } from 'react';

export default function Layout({ children }) {
  return (
    <div>
      {/* Suspense 사용으로 빌드 과정의 오류를 해결. Searchbar 컴포넌트에는 비동기 작업인 useSearchParams가 포함되어 있으므로 */}
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      <main>{children}</main>
    </div>
  );
}
