'use client';

import { CloudOff, RefreshCcw, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/shared/ui/GlassCard';

interface Props {
  message?: string;
  onRetry: () => void;
}

export function WeatherError({ message, onRetry }: Props) {
  return (
    <GlassCard className="flex max-w-[320px] flex-col items-center justify-center !border-red-100/30 !bg-red-50/10 text-center">
      {/* Icon Area */}
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-pulse rounded-full bg-red-400 opacity-20 blur-2xl" />
        <CloudOff className="relative h-16 w-16 text-red-400/80 drop-shadow-lg" />
        <AlertCircle className="absolute -right-1 -bottom-1 h-6 w-6 rounded-full bg-white p-0.5 text-red-500" />
      </div>

      {/* Error Message */}
      <h3 className="mb-2 text-xl font-bold text-gray-800">날씨를 찾을 수 없어요</h3>
      <p className="mb-8 px-2 text-sm leading-relaxed break-keep text-gray-600">
        {message || '위치 정보를 가져오는 중 문제가 발생했습니다.\n네트워크 상태를 확인해주세요.'}
      </p>

      {/* Retry Button */}
      <button
        onClick={onRetry}
        className="group relative flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-6 py-3 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white/60 active:scale-95"
      >
        <RefreshCcw className="h-4 w-4 text-gray-700 transition-transform duration-500 group-hover:rotate-180" />
        <span className="text-sm font-semibold text-gray-800">다시 시도하기</span>
      </button>
    </GlassCard>
  );
}
