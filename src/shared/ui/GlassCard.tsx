import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: Props) {
  return (
    <section
      className={`xs:p-8 relative w-full overflow-hidden rounded-[2rem] border border-white/50 bg-white/30 p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_0_rgba(31,38,135,0.25)] md:rounded-[3rem] md:p-10 lg:p-14 ${className} `}
    >
      {/* 배경 데코레이션 (Blob) */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-blue-400/30 blur-3xl md:h-48 md:w-48 lg:h-64 lg:w-64"></div>
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-purple-400/30 blur-3xl md:h-48 md:w-48 lg:h-64 lg:w-64"></div>

      {/* 컨텐츠 */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
