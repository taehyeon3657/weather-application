'use client';

import { CloudOff, RefreshCcw, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/shared/ui/GlassCard';

interface Props {
  message?: string;
}

export function WeatherError({ message }: Props) {
  return (
    <GlassCard className="flex max-w-[560px] flex-col items-center justify-center !border-red-100/30 !bg-red-50/10 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-pulse rounded-full bg-red-400 opacity-20 blur-2xl" />
        <CloudOff className="relative h-16 w-16 text-red-400/80 drop-shadow-lg" />
      </div>

      <h3 className="mb-2 text-xl font-bold text-gray-800">날씨를 찾을 수 없어요</h3>
      <p className="mb-8 px-2 text-sm leading-relaxed break-keep text-gray-600">
        {message || '위치 정보를 가져오는 중 문제가 발생했습니다.\n네트워크 상태를 확인해주세요.'}
      </p>
    </GlassCard>
  );
}
