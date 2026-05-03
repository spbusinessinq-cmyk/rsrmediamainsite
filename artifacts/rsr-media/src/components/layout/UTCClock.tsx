import React, { useState, useEffect } from 'react';

export function UTCClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toISOString().substring(11, 19) + ' UTC';
  };

  return (
    <div className="font-mono text-xs tracking-wider text-muted-foreground bg-black/40 px-2 py-1 rounded border border-border/40">
      {formatTime(time)}
    </div>
  );
}
