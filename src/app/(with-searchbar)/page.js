import BookItem from '@/components/book-item';
import style from './page.module.css';
import apiBaseUrl from '@/util/api';
// import delay from '@/util/delay';

// 정말 특별한 상황이 아니면, 이 설정은 사용하지 않는 것이 좋습니다.
// 'auto': 기본값, 아무것도 강제하지 않음. Next.js가 페이지의 유형을 자동으로 결정하도록 합니다.
// 'force-dynamic': 페이지를 강제로 Dynamic 페이지로 설정. 이 페이지가 항상 최신 데이터를 가져오도록 합니다.
// 'force-static': 페이지를 강제로 Static 페이지로 설정. 이 페이지가 정적으로 생성되어 캐시된 데이터를 사용하도록 합니다.
// 'error': 페이지를 강제로 Static 페이지로 설정. (설정하면 안되는 이유가 있다면-> 빌드할 때 오류가 발생합니다.)
// export const dynamic = 'force-dynamic';

async function AllBooks() {
  // await delay(1500); // 추천 도서를 불러오는 동안 1.5초 지연을 추가합니다.

  const response = await fetch(`${apiBaseUrl}/book`, { caches: 'force-cache' }); // 캐시된 데이터를 우선적으로 사용합니다.
  // cache: 'no-store' 옵션을 사용하여 항상 최신 데이터를 가져옵니다.
  // 이 옵션은 서버에서 데이터를 가져올 때 캐시를 사용하지 않도록 합니다.

  if (!response.ok) {
    throw new Error('Failed to fetch all books');
  }

  const allBooks = await response.json();
  console.log(`모든 도서: ${allBooks}`);

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  // await delay(3000); // 추천 도서를 불러오는 동안 3초 지연을 추가합니다.

  const response = await fetch(`${apiBaseUrl}/book/random`, { next: { revalidate: 3 } }); // 3초마다 데이터를 새로고침합니다.
  // next: { revalidate: 3 } 옵션을 사용하여 3초마다 데이터를 새로고침합니다.
  // 이 옵션은 서버에서 데이터를 가져올 때 캐시된 데이터를 사용하되, 3초마다 새로고침하여 최신 데이터를 가져옵니다.
  // 이 옵션은 성능을 최적화하는 데 유용합니다.
  // 또한, fetch 요청에 cache: 'force-cache' 옵션을 추가하여 캐시된 데이터를 우선적으로 사용합니다.

  if (!response.ok) {
    throw new Error('Failed to fetch recommended books');
  }

  const recoBooks = await response.json();
  console.log(`랜덤 도서: ${recoBooks}`);

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export const metadata = {
  title: '한입 북스',
  description: '한입 북스에 등록된 도서들을 만나보세요',
  openGraph: {
    title: '한입 북스',
    description: '한입 북스에 등록된 도서들을 만나보세요',
    images: ['/thumbnail.png'], // public 폴더에 넣어야 함
  },
};

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {/* 배포 후 최적화: Static페이지로 제공하기 위해 Suspense가 필요 없으므로 주석처리 */}
        {/* <Suspense fallback={<BookListSkeleton count={3} />}> */}
        <RecoBooks />
        {/* </Suspense> */}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {/* <Suspense fallback={<BookListSkeleton count={10} />}> */}
        <AllBooks />
        {/* </Suspense> */}
      </section>
    </div>
  );
}
