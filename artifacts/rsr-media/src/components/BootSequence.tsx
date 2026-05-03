import React, { useState, useEffect } from 'react';

export function BootSequence() {
  const [stage, setStage] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Skip if already booted this session
    if (sessionStorage.getItem('rsr_booted') === 'true') {
      setVisible(false);
      return;
    }

    // Skip if prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem('rsr_booted', 'true');
      setVisible(false);
      return;
    }

    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1200);
    const timer3 = setTimeout(() => setStage(3), 1800);
    const timer4 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('rsr_booted', 'true');
    }, 2500);

    const handleSkip = () => {
      setVisible(false);
      sessionStorage.setItem('rsr_booted', 'true');
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-background flex flex-col items-start justify-center p-8 md:p-24 cursor-pointer">
      <div className="font-mono text-sm md:text-base text-primary space-y-4 max-w-2xl">
        <div className="flex items-center gap-4 text-muted-foreground opacity-50 mb-8">
          <span className="animate-pulse">_</span>
          <span className="text-xs">[CLICK OR PRESS ANY KEY TO SKIP]</span>
        </div>
        
        {stage >= 0 && (
          <div className="flex items-start gap-4">
            <span className="text-muted-foreground">{'>'}</span>
            <span>INITIALIZING RSR MEDIA TERMINAL...</span>
          </div>
        )}
        {stage >= 1 && (
          <div className="flex items-start gap-4">
            <span className="text-muted-foreground">{'>'}</span>
            <span>LOADING FIELD OPERATIONS...</span>
          </div>
        )}
        {stage >= 2 && (
          <div className="flex items-start gap-4">
            <span className="text-muted-foreground">{'>'}</span>
            <span>VERIFYING SOURCE INTEGRITY...</span>
          </div>
        )}
        {stage >= 3 && (
          <div className="flex items-start gap-4 text-accent">
            <span className="text-accent">{'>'}</span>
            <span>SIGNAL ESTABLISHED.</span>
          </div>
        )}
      </div>
    </div>
  );
}
