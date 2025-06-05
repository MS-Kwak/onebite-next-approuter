import Link from 'next/link';
import { ReactNode } from 'react';

// @sidebar, @feed는 슬롯이라고 생각하시면 됩니다.
// 이 컴포넌트는 레이아웃을 정의하며, sidebar와 feed를 props로 받아서 렌더링합니다.
// children은 이 레이아웃을 사용하는 페이지의 콘텐츠를 나타냅니다.
export default function Layout({ children, sidebar, feed }) {
  return (
    <div>
      <div>
        <Link href={'/parallel'}>parallel</Link>
        &nbsp;
        <Link href={'/parallel/setting'}>parallel/setting</Link>
      </div>
      <br />
      {sidebar}
      {feed}
      {children}
    </div>
  );
}
