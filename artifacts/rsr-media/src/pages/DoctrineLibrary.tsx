import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { usePublishedReports } from '@/hooks/useReports';
import { ReportCard } from '@/components/reports/ReportCard';
import { ARMORY_URL } from '@/config/site';
import { BookOpen, ShoppingBag, ArrowRight, Download } from 'lucide-react';

const BOOK = {
  href: ARMORY_URL,
  title: 'Free Citizens, Not Managed Populations',
  subtitle: 'The Sovereignty Doctrine for the Age of Artificial Intelligence',
  description:
    'The founding manifesto of the Sovereignty Doctrine. A civic text for the age of artificial intelligence, invisible power, digital systems, and managed society.',
  paperbackUrl: ARMORY_URL,
  digitalUrl: ARMORY_URL,
};

export default function DoctrineLibrary() {
  useSEO({
    title: 'Doctrine Library',
    description:
      'Books, policy files, civic reports, and public intelligence documents that define the Sovereignty Doctrine: free citizens, not managed populations; human command, not machine rule.',
  });

  const { data: reports } = usePublishedReports();
  const policyFiles = reports.filter((r) => r.category === 'Policy File');
  const sovereigntyBriefs = reports.filter((r) => r.category === 'Sovereignty Brief');

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-[0.65rem] text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-amber-500/40" /> // DOCTRINE.LIBRARY
          </div>
          <h1
            className="text-[3rem] sm:text-[4.5rem] font-bold uppercase leading-tight mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            RSR DOCTRINE LIBRARY
          </h1>
          <p className="font-sans text-base text-muted-foreground max-w-2xl leading-relaxed">
            The Doctrine Library collects the books, policy files, civic reports, and public
            intelligence documents that define the Sovereignty Doctrine: free citizens, not
            managed populations; human command, not machine rule.
          </p>
        </div>

        {/* 1. Featured Book */}
        <section className="mb-16">
          <div className="font-mono text-xs text-amber-500 tracking-widest uppercase mb-5 flex items-center gap-2">
            <span className="w-6 h-px bg-amber-500" /> // FEATURED BOOK
          </div>
          <div className="border border-amber-500/30 bg-amber-500/[0.03] corner-bracket overflow-hidden">
            <div className="grid md:grid-cols-[280px_1fr] gap-0">
              <div className="bg-black/40 aspect-[3/4] md:aspect-auto md:min-h-[360px] flex items-center justify-center overflow-hidden border-r border-amber-500/20">
                <div className="flex flex-col items-center justify-center text-amber-500/50 p-8 text-center">
                  <BookOpen className="w-14 h-14 mb-4" />
                  <div className="font-mono text-[0.58rem] tracking-widest uppercase">
                    SOVEREIGNTY DOCTRINE
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="font-mono text-[0.6rem] text-amber-500/80 tracking-widest uppercase mb-3">
                  // FOUNDING MANIFESTO
                </div>
                <h2
                  className="text-3xl md:text-4xl font-bold uppercase mb-3"
                  style={{ fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.1 }}
                >
                  {BOOK.title}
                </h2>
                <p className="font-sans text-base text-muted-foreground italic mb-4 leading-relaxed">
                  {BOOK.subtitle}
                </p>
                <p className="font-sans text-sm text-foreground/75 leading-relaxed mb-6">
                  {BOOK.description}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href={BOOK.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold border border-amber-500/50 text-amber-500 px-4 py-2.5 hover:bg-amber-500 hover:text-black transition-all tracking-widest uppercase"
                  >
                    View Book <ArrowRight className="w-3 h-3" />
                  </a>
                  <a
                    href={BOOK.paperbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs border border-border/45 text-foreground/80 px-4 py-2.5 hover:border-foreground/40 hover:text-foreground transition-all tracking-widest uppercase"
                  >
                    <ShoppingBag className="w-3 h-3" /> Buy Paperback
                  </a>
                  <a
                    href={BOOK.digitalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs border border-border/45 text-foreground/80 px-4 py-2.5 hover:border-foreground/40 hover:text-foreground transition-all tracking-widest uppercase"
                  >
                    <Download className="w-3 h-3" /> Digital Edition
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Policy Files */}
        {policyFiles.length > 0 && (
          <section className="mb-16">
            <div className="font-mono text-xs text-primary tracking-widest uppercase mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-primary" /> // POLICY FILES
            </div>
            <p className="font-sans text-sm text-muted-foreground mb-6 max-w-2xl">
              Standing doctrine documents that establish the civic and editorial framework RSR
              Media operates under.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {policyFiles.map((r) => (
                <ReportCard key={r.id} report={r} />
              ))}
            </div>
          </section>
        )}

        {/* 3. Sovereignty Brief (coming soon) */}
        <section className="mb-16">
          <div className="font-mono text-xs text-amber-500 tracking-widest uppercase mb-5 flex items-center gap-2">
            <span className="w-6 h-px bg-amber-500" /> // THE SOVEREIGNTY BRIEF
          </div>
          {sovereigntyBriefs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sovereigntyBriefs.map((r) => (
                <ReportCard key={r.id} report={r} />
              ))}
            </div>
          ) : (
            <div className="border border-amber-500/20 bg-amber-500/[0.02] corner-bracket p-8">
              <div className="font-mono text-[0.62rem] text-amber-500/70 tracking-widest uppercase mb-3">
                // COMING SOON
              </div>
              <p className="font-sans text-base text-foreground/80 leading-relaxed max-w-2xl">
                Weekly analysis on AI, technology, institutional power, digital infrastructure,
                and the future of human sovereignty.
              </p>
            </div>
          )}
        </section>

        {/* 4. Produced Through Pacific Systems */}
        <section className="pt-8 border-t border-border/20">
          <p className="font-mono text-[0.65rem] text-muted-foreground/70 tracking-widest uppercase">
            Published by Red State Rhetoric. Produced through Pacific Systems.
          </p>
        </section>
      </div>
    </div>
  );
}
