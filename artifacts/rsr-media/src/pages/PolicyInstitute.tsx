import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { usePublishedReports } from '@/hooks/useReports';
import { ReportCard } from '@/components/reports/ReportCard';
import { BookOpen, ArrowRight, Download, Eye, Lock, FileSearch } from 'lucide-react';

const BOOK_ONE = {
  title: 'Free Citizens, Not Managed Populations',
  subtitle: 'The Sovereignty Doctrine for the Age of Artificial Intelligence',
  status: 'Coming June 8, 2026',
  substatus: 'Paperback proof ordered / release scheduled',
  description:
    'The founding manifesto of the Sovereignty Doctrine. A civic text for the age of artificial intelligence, invisible power, digital systems, and managed society.',
  href: '/books/free-citizens',
  coverUrl: '/books/free-citizens/Free_Citizens_Cover_1600x2560_RGB.jpg',
  previewPdfUrl: '/books/free-citizens/Free_Citizens_Preview_Excerpt.pdf',
};

const BOOK_TWO = {
  title: 'Human Command',
  subtitle: 'The Sovereignty Doctrine for the Intelligence Age',
  status: 'Final Proof Preview',
  substatus: 'Full release coming later',
  description:
    'Book 2 of the Sovereignty Doctrine. Human Command argues that artificial intelligence may become infrastructure, but infrastructure cannot become authority. The machine may assist. The human must command.',
  href: '/books/human-command',
  coverUrl: '/books/human-command/Human_Command_Cover_1600x2560_RGB.jpg',
  previewPdfUrl: '/books/human-command/Human_Command_Preview_Excerpt_First_24_Pages.pdf',
};

function useAssetAvailable(url: string) {
  const [available, setAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(url, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setAvailable(res.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);
  return available;
}

function SectionHeader({
  marker,
  number,
  title,
  description,
  tone = 'primary',
}: {
  marker: string;
  number: string;
  title: string;
  description: string;
  tone?: 'primary' | 'amber' | 'accent' | 'muted';
}) {
  const toneClass =
    tone === 'amber'
      ? 'text-amber-500 bg-amber-500'
      : tone === 'accent'
      ? 'text-accent bg-accent'
      : tone === 'muted'
      ? 'text-zinc-300 bg-zinc-400'
      : 'text-primary bg-primary';
  const [textTone, barTone] = toneClass.split(' ');
  return (
    <div className="mb-6">
      <div
        className={`font-mono text-[0.62rem] tracking-widest uppercase mb-3 flex items-center gap-2 ${textTone}`}
      >
        <span className={`w-6 h-px ${barTone}`} /> {marker} · {number}
      </div>
      <h2
        className="text-2xl md:text-3xl uppercase mb-2"
        style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, lineHeight: 1.1 }}
      >
        {title}
      </h2>
      <p className="font-sans text-[0.95rem] text-foreground/70 leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  );
}

export default function PolicyInstitute() {
  useSEO({
    title: 'RSR Policy Institute',
    description:
      'Books, policy files, civic policy positions, weekly briefs, editorial standards, and investigations from the RSR Policy Institute.',
  });

  const { data: reports } = usePublishedReports();
  const policyFiles = reports.filter((r) => r.category === 'Policy File');
  const civicPolicy = reports.filter(
    (r) => r.category === 'Civic Policy' || r.category === ('Civic Policy Position' as never),
  );
  const sovereigntyBriefs = reports.filter((r) => r.category === 'Sovereignty Brief');
  const editorialStandards = reports.filter((r) => r.category === 'Editorial Standard');
  const book2PdfAvailable = useAssetAvailable(BOOK_TWO.previewPdfUrl);
  const book2CoverAvailable = useAssetAvailable(BOOK_TWO.coverUrl);
  const book1CoverAvailable = useAssetAvailable(BOOK_ONE.coverUrl);

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1180px]">
        {/* ── Header ── */}
        <header className="mb-14">
          <div className="font-mono text-[0.62rem] text-muted-foreground/55 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-primary/50" /> // RSR.POLICY.INSTITUTE
          </div>
          <h1
            className="text-[2.6rem] sm:text-[3.6rem] lg:text-[4.2rem] font-bold uppercase leading-[1.02] mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            RSR Policy Institute
          </h1>
          <p className="font-sans text-lg text-foreground/80 max-w-3xl leading-relaxed mb-4">
            Books, policy files, civic policy positions, weekly briefs, editorial standards, and
            investigations for the Intelligence Age.
          </p>
          <p className="font-sans text-base text-foreground/70 max-w-3xl leading-relaxed mb-6">
            RSR Policy Institute is the doctrine and civic-policy arm of Red State Rhetoric. It
            publishes books, policy files, civic positions, weekly briefs, editorial standards, and
            investigations designed to make power visible and defend the citizen.
          </p>
          <div className="border-l-2 border-primary/40 bg-card/30 pl-5 py-3 max-w-3xl">
            <p
              className="font-mono text-[0.78rem] sm:text-sm text-primary/85 tracking-wide uppercase leading-relaxed"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Read the documents. Decode the systems. Publish the files. Defend the citizen.
            </p>
          </div>
        </header>

        {/* ── 1. BOOKS ── */}
        <section className="mb-16">
          <SectionHeader
            marker="// BOOKS"
            number="01"
            title="Books"
            description="Long-form doctrine texts published by the RSR Policy Institute. The first two books of the Sovereignty Doctrine."
            tone="amber"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Book 1 — Free Citizens (coming soon) */}
            <div className="border border-amber-500/30 bg-card/35 corner-bracket overflow-hidden flex flex-col">
              <div className="grid grid-cols-[140px_1fr] gap-0">
                <div className="relative bg-black/40 flex items-center justify-center border-r border-amber-500/15 overflow-hidden">
                  {book1CoverAvailable ? (
                    <img
                      src={BOOK_ONE.coverUrl}
                      alt={`${BOOK_ONE.title} cover`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="w-10 h-10 text-amber-500/55" aria-hidden />
                  )}
                </div>
                <div className="p-5 flex flex-col">
                  <div className="font-mono text-[0.58rem] text-amber-500/85 tracking-widest uppercase mb-1 flex items-center gap-2">
                    <Lock className="w-3 h-3" /> {BOOK_ONE.status.toUpperCase()}
                  </div>
                  <div className="font-mono text-[0.55rem] text-amber-500/55 tracking-widest uppercase mb-2">
                    // {BOOK_ONE.substatus}
                  </div>
                  <h3
                    className="text-xl font-bold uppercase mb-1 leading-tight"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {BOOK_ONE.title}
                  </h3>
                  <p className="font-sans text-[0.82rem] text-foreground/65 italic mb-3 leading-snug">
                    {BOOK_ONE.subtitle}
                  </p>
                  <p className="font-sans text-sm text-foreground/75 leading-relaxed mb-4">
                    {BOOK_ONE.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <Link
                      href={BOOK_ONE.href}
                      className="inline-flex items-center gap-2 font-mono text-[0.65rem] font-bold border border-amber-500/50 text-amber-500 px-3 py-2 hover:bg-amber-500 hover:text-black transition-all tracking-widest uppercase"
                    >
                      <Eye className="w-3 h-3" /> Preview Book
                    </Link>
                    <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] border border-border/40 text-muted-foreground/85 bg-card/30 px-3 py-2 tracking-widest uppercase">
                      Coming June 8
                    </span>
                    <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] border border-border/30 text-muted-foreground/55 px-3 py-2 tracking-widest uppercase">
                      Store Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Book 2 — Human Command (final proof preview) */}
            <div className="border border-primary/30 bg-card/35 corner-bracket overflow-hidden flex flex-col">
              <div className="grid grid-cols-[140px_1fr] gap-0">
                <div className="relative bg-black/40 flex items-center justify-center border-r border-primary/15 overflow-hidden">
                  {book2CoverAvailable ? (
                    <img
                      src={BOOK_TWO.coverUrl}
                      alt={`${BOOK_TWO.title} cover`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="w-10 h-10 text-primary/55" aria-hidden />
                  )}
                </div>
                <div className="p-5 flex flex-col">
                  <div className="font-mono text-[0.58rem] text-primary/85 tracking-widest uppercase mb-1 flex items-center gap-2">
                    <FileSearch className="w-3 h-3" /> {BOOK_TWO.status.toUpperCase()}
                  </div>
                  <div className="font-mono text-[0.55rem] text-primary/55 tracking-widest uppercase mb-2">
                    // {BOOK_TWO.substatus}
                  </div>
                  <h3
                    className="text-xl font-bold uppercase mb-1 leading-tight"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {BOOK_TWO.title}
                  </h3>
                  <p className="font-sans text-[0.82rem] text-foreground/65 italic mb-3 leading-snug">
                    {BOOK_TWO.subtitle}
                  </p>
                  <p className="font-sans text-sm text-foreground/75 leading-relaxed mb-4">
                    {BOOK_TWO.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {book2PdfAvailable ? (
                      <>
                        <a
                          href={BOOK_TWO.previewPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-mono text-[0.65rem] font-bold border border-primary/50 text-primary px-3 py-2 hover:bg-primary hover:text-primary-foreground transition-all tracking-widest uppercase"
                        >
                          <Eye className="w-3 h-3" /> Read Preview
                        </a>
                        <a
                          href={BOOK_TWO.previewPdfUrl}
                          download
                          className="inline-flex items-center gap-2 font-mono text-[0.65rem] border border-border/50 text-muted-foreground px-3 py-2 hover:text-foreground hover:border-border transition-all tracking-widest uppercase"
                        >
                          <Download className="w-3 h-3" /> Download Preview PDF
                        </a>
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] border border-border/40 text-muted-foreground/85 bg-card/30 px-3 py-2 tracking-widest uppercase">
                        Preview File Coming Soon
                      </span>
                    )}
                    <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] border border-border/30 text-muted-foreground/55 px-3 py-2 tracking-widest uppercase">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. POLICY FILES ── */}
        <section className="mb-16">
          <SectionHeader
            marker="// POLICY FILES"
            number="02"
            title="Policy Files"
            description="Foundational doctrine reports on artificial intelligence, public power, digital infrastructure, records, identity, government automation, and human command."
            tone="primary"
          />
          {policyFiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {policyFiles.map((r) => (
                <ReportCard key={r.id} report={r} />
              ))}
            </div>
          ) : (
            <div className="border border-border/30 bg-card/15 p-8 corner-bracket font-mono text-xs text-muted-foreground/70 tracking-widest uppercase">
              // No policy files published yet.
            </div>
          )}
        </section>

        {/* ── 3. CIVIC POLICY POSITIONS ── */}
        <section className="mb-16">
          <SectionHeader
            marker="// CIVIC POLICY POSITIONS"
            number="03"
            title="Civic Policy Positions"
            description="Citizens-first policy frameworks on immigration, housing, public safety, labor, education, and digital rights."
            tone="accent"
          />
          {civicPolicy.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {civicPolicy.map((r) => (
                <ReportCard key={r.id} report={r} featured={r.featured} />
              ))}
            </div>
          ) : (
            <div className="border border-border/30 bg-card/15 p-8 corner-bracket font-mono text-xs text-muted-foreground/70 tracking-widest uppercase">
              // No civic policy positions published yet.
            </div>
          )}
        </section>

        {/* ── 4. SOVEREIGNTY BRIEFS ── */}
        <section className="mb-16">
          <SectionHeader
            marker="// SOVEREIGNTY BRIEFS"
            number="04"
            title="Sovereignty Briefs"
            description="Weekly analysis on AI, technology, institutional power, digital infrastructure, and human sovereignty."
            tone="amber"
          />
          {sovereigntyBriefs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sovereigntyBriefs.map((r) => (
                <ReportCard key={r.id} report={r} />
              ))}
            </div>
          ) : (
            <div className="border border-amber-500/20 bg-amber-500/[0.03] corner-bracket p-6">
              <div className="font-mono text-[0.62rem] text-amber-500/85 tracking-widest uppercase mb-2">
                // COMING SOON
              </div>
              <p className="font-sans text-sm text-foreground/75 leading-relaxed max-w-2xl">
                The first Sovereignty Brief is in production. Weekly briefs will publish on AI
                infrastructure, institutional power, and citizen sovereignty.
              </p>
            </div>
          )}
        </section>

        {/* ── 5. EDITORIAL STANDARDS ── */}
        <section className="mb-16">
          <SectionHeader
            marker="// EDITORIAL STANDARDS"
            number="05"
            title="Editorial Standards"
            description="The standards RSR uses for verification, source protection, corrections, conflicts, AI use, and publication discipline."
            tone="muted"
          />
          {editorialStandards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {editorialStandards.map((r) => (
                <ReportCard key={r.id} report={r} />
              ))}
            </div>
          ) : (
            <div className="border border-zinc-400/20 bg-card/15 corner-bracket p-6">
              <div className="font-mono text-[0.62rem] text-zinc-300 tracking-widest uppercase mb-2">
                // COMING SOON
              </div>
              <p className="font-sans text-sm text-foreground/75 leading-relaxed max-w-2xl">
                The RSR Editorial Standards document — verification, source protection,
                corrections, conflicts of interest, AI use, and publication discipline — is in
                final review.
              </p>
            </div>
          )}
        </section>

        {/* ── 6. INVESTIGATIONS ── */}
        <section className="mb-16">
          <SectionHeader
            marker="// INVESTIGATIONS"
            number="06"
            title="Investigations"
            description="Long-form investigative files into AI systems, public infrastructure, and institutional power."
            tone="primary"
          />
          <div className="border border-primary/25 bg-card/25 corner-bracket p-6">
            <div className="font-mono text-[0.62rem] text-primary/80 tracking-widest uppercase mb-3 flex items-center gap-2">
              <FileSearch className="w-3 h-3" /> // OPENING FILE SOON
            </div>
            <h3
              className="text-xl md:text-2xl font-bold uppercase mb-2 leading-tight"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              RSR Investigation File #001 — AI in Los Angeles Public Systems
            </h3>
            <p className="font-sans text-[0.92rem] text-foreground/70 italic mb-3 leading-snug max-w-3xl">
              What tools are being used, who sold them, who audits them, and whether citizens can
              appeal.
            </p>
            <p className="font-sans text-sm text-foreground/65 leading-relaxed max-w-3xl">
              The first RSR Investigation File opens an inquiry into AI systems deployed across
              Los Angeles public infrastructure — procurement records, vendor contracts, oversight
              mechanisms, and citizen appeal paths.
            </p>
          </div>
        </section>

        {/* ── Footer line ── */}
        <section className="pt-8 border-t border-border/20">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="font-mono text-[0.65rem] text-muted-foreground/75 tracking-widest uppercase">
              Published by Red State Rhetoric. Produced through Pacific Systems.
            </p>
            <Link
              href="/reports"
              className="inline-flex items-center gap-2 font-mono text-[0.65rem] text-primary hover:underline tracking-widest uppercase"
            >
              Full Report Archive <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
