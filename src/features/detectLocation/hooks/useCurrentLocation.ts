'use client';

import { useState, useLayoutEffect } from 'react';

interface Location {
  lat: number;
  lon: number;
}

export function useCurrentLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('위치 정보를 사용할 수 없는 브라우저입니다.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        console.error('위치 감지 실패:', err.message);
        setError('위치 권한을 허용해주세요.');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true, // 정확도 최우선
        timeout: 10000,
      }
    );
  }, []);

  return { location, error, isLoading };
}
