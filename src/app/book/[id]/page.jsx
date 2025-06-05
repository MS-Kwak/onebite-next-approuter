import { notFound } from 'next/navigation';
import style from './page.module.css';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';
import Image from 'next/image';
import apiBaseUrl from '@/util/api';

// 아래 코드는 기본값이 true로 설정되어 있습니다.
// export const dynamicParams = false;
export async function generateStaticParams() {
  // return [{ id: '1' }, { id: '2' }, { id: '3' }];

  const response = await fetch(`${apiBaseUrl}/book`);
  if (!response.ok) {
    throw new Error(`책 목록을 불러오는 데 실패했습니다: ${response.statusText}`);
  }

  const books = await response.json();

  return books.map((book) => ({
    id: book.id.toString(), // id를 문자열로 변환하여 반환합니다.
  }));
}

async function BookDetail({ bookId }) {
  const response = await fetch(`${apiBaseUrl}/book/${bookId}`, {
    cache: 'force-cache', // 캐시를 사용하여 빠른 응답을 제공합니다.
  });

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          width={240}
          height={300}
          alt={`도서 ${title}의 표지 이미지`}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }) {
  const response = await fetch(
    `${apiBaseUrl}/review/book/${bookId}`,
    // src/actions/create-review.action.js
    { next: { tags: [`review-${bookId}`] } }
  );

  if (!response.ok) {
    throw new Error(`리뷰 목록을 불러오는 데 실패했습니다: ${response.statusText}`);
  }

  const reviews = await response.json();

  console.log('리뷰 목록:', reviews);

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

// 현재 페이지의 메타데이터를 동적으로 생성하는 역할을 합니다.
export async function generateMetadata({ params }) {
  const { id } = await params;

  const response = await fetch(`${apiBaseUrl}/book/${id}`);

  if (!response.ok) {
    throw new Error(`책 정보를 불러오는 데 실패했습니다: ${response.statusText}`);
  }

  const book = await response.json();

  return {
    title: `${book.title} - 한입북스`,
    description: book.description,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: book.description,
      images: [book.coverImgUrl],
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
