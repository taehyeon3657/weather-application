'use client';

import { GlassCard } from '@/shared/ui/GlassCard';

export function WeatherSkeleton() {
  return (
    // 실제 위젯과 동일한 Responsive Max-Width 적용 (Layout Shift 방지)
    <GlassCard className="xs:max-w-[340px] max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[560px]">
      {/* 1. Header Skeleton */}
      <div className="mb-8 flex animate-pulse items-start justify-between">
        <div className="flex flex-col gap-2">
          {/* Location Label */}
          <div className="h-3 w-20 rounded-full bg-white/30" />
          {/* City Name */}
          <div className="xs:w-40 h-8 w-32 rounded-lg bg-white/20 md:w-56" />
        </div>
        {/* Refresh Button */}
        <div className="h-8 w-8 rounded-full bg-white/30 md:h-10 md:w-10" />
      </div>

      {/* 2. Main Info Skeleton */}
      <div className="mt-6 mb-8 flex animate-pulse flex-col items-center md:mt-10 md:mb-12">
        {/* Icon Placeholder */}
        <div className="xs:w-40 xs:h-40 mb-4 h-32 w-32 rounded-full bg-white/10 md:h-52 md:w-52 lg:h-64 lg:w-64" />

        {/* Temp Placeholder */}
        <div className="xs:h-24 mb-4 h-20 w-1/2 rounded-2xl bg-white/20 md:h-32 lg:h-40" />

        {/* Description Badge */}
        <div className="xs:h-8 h-6 w-24 rounded-full bg-white/30 md:h-10 md:w-32" />
      </div>

      {/* 3. Footer Grid Skeleton */}
      <div className="grid animate-pulse grid-cols-2 gap-3 md:gap-5 lg:gap-6">
        {/* Min Temp Card */}
        <div className="xs:h-20 h-16 rounded-2xl border border-white/10 bg-white/20 md:h-24" />
        {/* Max Temp Card */}
        <div className="xs:h-20 h-16 rounded-2xl border border-white/10 bg-white/20 md:h-24" />
      </div>
    </GlassCard>
  );
}
