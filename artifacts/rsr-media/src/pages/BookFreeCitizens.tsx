import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { ArrowLeft, Download, Eye, Lock } from 'lucide-react';

const COVER_URL = '/books/free-citizens/Free_Citizens_Cover_1600x2560_RGB.jpg';
const PREVIEW_PDF = '/books/free-citizens/Free_Citizens_Preview_Excerpt.pdf';

export default function BookFreeCitizens() {
  useSEO({
    title: 'Free Citizens, Not Managed Populations — RSR Policy Institute',
    description:
      'Book 1 of the Sovereignty Doctrine. The founding manifesto for the Age of Artificial Intelligence. Coming June 8, 2026.',
  });

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1100px]">
        <Link
          href="/policy-institute"
          className="inline-flex items-center gap-2 font-mono text-[0.65rem] text-muted-foreground hover:text-amber-500 tracking-widest uppercase mb-8 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Policy Institute
        </Link>

        <div className="font-mono text-[0.62rem] text-amber-500/85 tracking-widest uppercase flex items-center gap-2 mb-4">
          <span className="w-8 h-px bg-amber-500/60" /> // BOOKS · 01 · FOUNDING MANIFESTO
        </div>

        <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">
          {/* Cover */}
          <div className="border border-amber-500/30 bg-black/40 corner-bracket overflow-hidden aspect-[1600/2560] max-w-[320px] w-full">
            <img
              src={COVER_URL}
              alt="Free Citizens, Not Managed Populations — book cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="font-mono text-[0.65rem] text-amber-500/85 tracking-widest uppercase mb-3 flex items-center gap-2">
              <Lock className="w-3 h-3" /> COMING JUNE 8, 2026
            </div>
            <div className="font-mono text-[0.6rem] text-amber-500/55 tracking-widest uppercase mb-5">
              // Paperback proof ordered / release scheduled
            </div>

            <h1
              className="text-[2.4rem] sm:text-[3rem] font-bold uppercase leading-[1.05] mb-3"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Free Citizens, Not Managed Populations
            </h1>
            <p className="font-sans text-lg text-foreground/75 italic mb-5 leading-snug">
              The Sovereignty Doctrine for the Age of Artificial Intelligence
            </p>
            <p className="font-mono text-[0.7rem] text-muted-foreground/60 tracking-widest uppercase mb-6">
              By Red State Rhetoric · RSR Policy Institute
            </p>

            <div className="space-y-4 font-sans text-base text-foreground/85 leading-relaxed mb-8">
              <p>
                Book 1 of the Sovereignty Doctrine. The founding manifesto for the Intelligence
                Age. A civic text on artificial intelligence, invisible power, digital systems,
                and managed society — and on the standard that must hold: free citizens, not
                managed populations.
              </p>
              <p>
                The book argues that the deepest political question of the next century is not
                left or right, but whether human beings retain civic authority over the systems
                that govern their lives — or whether quiet, optimized management replaces
                self-government without ever announcing itself.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={PREVIEW_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold border border-amber-500/55 text-amber-500 px-4 py-2.5 hover:bg-amber-500 hover:text-black transition-all tracking-widest uppercase"
              >
                <Eye className="w-3 h-3" /> Read Preview
              </a>
              <a
                href={PREVIEW_PDF}
                download
                className="inline-flex items-center gap-2 font-mono text-xs border border-border/50 text-muted-foreground px-4 py-2.5 hover:text-foreground hover:border-border transition-all tracking-widest uppercase"
              >
                <Download className="w-3 h-3" /> Download Preview PDF
              </a>
              <span className="inline-flex items-center gap-2 font-mono text-xs border border-border/30 text-muted-foreground/55 px-4 py-2.5 tracking-widest uppercase">
                Store Coming Soon
              </span>
            </div>

            <div className="border border-amber-500/20 bg-amber-500/[0.03] corner-bracket p-5">
              <div className="font-mono text-[0.6rem] text-amber-500/85 tracking-widest uppercase mb-2">
                // RELEASE STATUS
              </div>
              <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                Paperback proof copy ordered. Release scheduled for June 8, 2026. Store listing
                and purchase links will publish on release day.
              </p>
            </div>
          </div>
        </div>

        {/* Preview file access (no inline viewer) */}
        <section className="mt-12">
          <div className="border border-border/40 bg-card/25 corner-bracket p-5 max-w-xl">
            <div className="font-mono text-[0.6rem] text-amber-500/85 tracking-widest uppercase mb-2">
              // PREVIEW FILE
            </div>
            <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-4">
              Preview excerpt available as a PDF. Open it in a new tab or download a copy.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={PREVIEW_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[0.65rem] font-bold border border-amber-500/50 text-amber-500 px-3 py-2 hover:bg-amber-500 hover:text-black transition-all tracking-widest uppercase"
              >
                <Eye className="w-3 h-3" /> Open Preview
              </a>
              <a
                href={PREVIEW_PDF}
                download
                className="inline-flex items-center gap-2 font-mono text-[0.65rem] border border-border/50 text-muted-foreground px-3 py-2 hover:text-foreground hover:border-border transition-all tracking-widest uppercase"
              >
                <Download className="w-3 h-3" /> Download PDF
              </a>
            </div>
          </div>
        </section>

        <section className="mt-16 pt-8 border-t border-border/20 flex items-center justify-between gap-3 flex-wrap">
          <p className="font-mono text-[0.65rem] text-muted-foreground/75 tracking-widest uppercase">
            Published by Red State Rhetoric. Produced through Pacific Systems.
          </p>
          <Link
            href="/policy-institute"
            className="font-mono text-[0.65rem] text-amber-500 hover:underline tracking-widest uppercase"
          >
            ← All Books & Policy Files
          </Link>
        </section>
      </div>
    </div>
  );
}
