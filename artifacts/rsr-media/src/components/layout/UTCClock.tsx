import React, { useState, useEffect } from 'react';

function getLocalParts(date: Date) {
  // Time: "6:31 PM"
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Timezone abbreviation via Intl: "PDT", "EST", "CST", etc.
  const tzStr = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
    .formatToParts(date)
    .find(p => p.type === 'timeZoneName')?.value ?? '';

  const fullDate = date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'long',
  });

  return { timeStr, tzStr, fullDate };
}

export function UTCClock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { timeStr, tzStr, fullDate } = getLocalParts(date);

  return (
    <div
      className="font-mono text-[0.6rem] tracking-widest text-muted-foreground bg-black/30 px-2 py-1 border border-border/30 whitespace-nowrap select-none cursor-default"
      title={fullDate}
    >
      <span className="text-muted-foreground/45 mr-1">LOCAL</span>
      {timeStr}
      {tzStr && <span className="text-muted-foreground/40 ml-1">{tzStr}</span>}
    </div>
  );
}
