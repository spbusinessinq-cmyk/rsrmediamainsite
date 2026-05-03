import React from 'react';
import { cn } from '@/lib/utils';

interface LogoWatermarkProps {
  className?: string;
}

export function LogoWatermark({ className }: LogoWatermarkProps) {
  return (
    <img
      src="/rsr-logo.png"
      alt=""
      aria-hidden="true"
      className={cn('pointer-events-none select-none object-contain', className)}
    />
  );
}
