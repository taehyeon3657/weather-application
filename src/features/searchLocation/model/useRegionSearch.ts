'use client';

import { useState, useEffect } from 'react';
import districtData from '@/shared/data/korea_districts.json';

export function useRegionSearch() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const query = keyword.replace(/\s+/g, '');
      const filtered = districtData.filter((item) => {
        const cleanItem = item.replaceAll('-', '').replace(/\s+/g, '');
        return cleanItem.includes(query);
      });
      setResults(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  return { keyword, setKeyword, results };
}
