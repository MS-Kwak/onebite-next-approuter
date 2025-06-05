'use client';

import { useEffect, useState } from 'react';
import style from './searchbar.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  const q = searchParams.get('q');

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search.trim() || q === search) {
      return;
    }

    // Use router.push to navigate to the search page with the query
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder="검색어를 입력하세요..."
      />
      <button onClick={onSubmit} type="submit">
        검색
      </button>
    </div>
  );
}
