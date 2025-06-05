import apiBaseUrl from '@/util/api';
import './globals.css';
import style from './layout.module.css';
import Link from 'next/link';

async function Footer() {
  // 새로운 도서를 추가한다거나 삭제하는 로직이 우리 프로젝트에는 없으므로, 정적 페이지로 만들기 위해 캐시를 사용합니다.
  const response = await fetch(`${apiBaseUrl}/book`, { caches: 'force-cache' });
  if (!response.ok) {
    return <footer>제작 @Ethna's Lab.</footer>;
  }

  const books = await response.json();
  const bookCount = books.length;

  return (
    <footer>
      <div>제작 @Ethna's Lab.</div>
      <div>등록된 도서 수: {bookCount}권</div>
    </footer>
  );
}

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href="/">📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
        {modal}
        {/* 모달을 위한 루트 엘리먼트 */}
        {/* 이 엘리먼트는 모달 컴포넌트에서 사용됩니다. */}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
