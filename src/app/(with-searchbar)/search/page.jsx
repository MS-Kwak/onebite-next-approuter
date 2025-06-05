import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import apiBaseUrl from '@/util/api';
// import delay from '@/util/delay';
import { Suspense } from 'react';

// 아래 기본값은 true, 데이터에 존재하지만, 만약 아래 정적 경로만 사용하려면...
// export const dynamicParams = false; // 이 설정은 동적 경로 생성을 비활성화합니다.

// export function generateStaticParams() {
//   // 이 함수는 빌드 시에만 실행되며, 검색어에 대한 정적 경로를 생성합니다.
//   return [{ id: '1' }, { id: '2' }, { id: '3' }];
// }

async function SearchResult({ q }) {
  // await delay(1500); // 검색 결과를 불러오는 동안 1초 지연을 추가합니다.

  const response = await fetch(`${apiBaseUrl}/book/search?q=${q}`, {
    cache: 'force-cache', // 한번 검색한 결과를 캐시하여 다음 검색 시 빠르게 응답합니다.
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return <div>검색 결과를 불러오는 데 오류가 발생했습니다...</div>;
  }
  const books = await response.json();
  console.log(books);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 현재 페이지의 메타데이터를 동적으로 생성하는 약속된 이름의 함수를 사용!!
export async function generateMetadata({ searchParams }) {
  const q = (await searchParams.q) || '';
  return {
    title: `검색 결과: ${q}`,
    description: `검색어 "${q}"에 대한 도서 목록입니다.`,
    openGraph: {
      title: `검색 결과: ${q}`,
      description: `검색어 "${q}"에 대한 도서 목록입니다.`,
      images: ['/thumbnail.png'], // public 폴더에 넣어야 함
    },
  };
}

export default function SearchPage({ searchParams }) {
  const { q } = searchParams;
  console.log('Search query:', q);

  return (
    // Suspense(미완성 or 미결)를 사용하여 로딩 상태를 처리합니다.
    // 검색어(key={q})가 변경될 때마다 새로운 검색 결과를 불러옵니다.
    // key값이 변화할때 마다 다시 로딩상태가 되도록 Suspense 컴포넌트에 key를 설정합니다.
    <Suspense key={q || ''} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ''} />
    </Suspense>
  );
}
