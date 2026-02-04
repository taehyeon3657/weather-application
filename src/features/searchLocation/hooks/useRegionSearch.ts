'use client';

import { useState, useEffect, useMemo } from 'react';
import districtData from '@/shared/data/korea_districts.json';

export function useRegionSearch() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    const query = keyword.replace(/\s+/g, '');

    const filtered = districtData.filter((item) => {
      const cleanItem = item.replace(/-/g, '').replace(/\s+/g, '');
      return cleanItem.includes(query);
    });
    setResults(filtered.slice(0, 20));
  }, [keyword]);

  return { keyword, setKeyword, results };
}
