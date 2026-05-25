import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { ArrowLeft, Download, Eye, FileSearch } from 'lucide-react';

const COVER_URL = '/books/human-command/Human_Command_Cover_1600x2560_RGB.jpg';
const PREVIEW_PDF = '/books/human-command/Human_Command_Preview_Excerpt_First_24_Pages.pdf';

export default function BookHumanCommand() {
  useSEO({
    title: 'Human Command — RSR Policy Institute',
    description:
      'Book 2 of the Sovereignty Doctrine. Why the machine may assist, but the human must command. Final proof preview available now.',
  });

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1100px]">
        <Link
          href="/policy-institute"
          className="inline-flex items-center gap-2 font-mono text-[0.65rem] text-muted-foreground hover:text-primary tracking-widest uppercase mb-8 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Policy Institute
        </Link>

        <div className="font-mono text-[0.62rem] text-primary/85 tracking-widest uppercase flex items-center gap-2 mb-4">
          <span className="w-8 h-px bg-primary/60" /> // BOOKS · 02 · INTELLIGENCE AGE
        </div>

        <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">
          {/* Cover */}
          <div className="border border-primary/30 bg-black/40 corner-bracket overflow-hidden aspect-[1600/2560] max-w-[320px] w-full">
            <img
              src={COVER_URL}
              alt="Human Command — book cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="font-mono text-[0.65rem] text-primary/85 tracking-widest uppercase mb-3 flex items-center gap-2">
              <FileSearch className="w-3 h-3" /> FINAL PROOF PREVIEW
            </div>
            <div className="font-mono text-[0.6rem] text-primary/55 tracking-widest uppercase mb-5">
              // Full release coming later
            </div>

            <h1
              className="text-[2.4rem] sm:text-[3rem] font-bold uppercase leading-[1.05] mb-3"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Human Command
            </h1>
            <p className="font-sans text-lg text-foreground/75 italic mb-5 leading-snug">
              The Sovereignty Doctrine for the Intelligence Age
            </p>
            <p className="font-mono text-[0.7rem] text-muted-foreground/60 tracking-widest uppercase mb-6">
              By Red State Rhetoric · RSR Policy Institute
            </p>

            <div className="space-y-4 font-sans text-base text-foreground/85 leading-relaxed mb-8">
              <p>
                Book 2 of the Sovereignty Doctrine. Human Command argues that artificial
                intelligence may become infrastructure, but infrastructure cannot become
                authority. The machine may assist. The human must command.
              </p>
              <p>
                Where Book 1 establishes the civic standard, Human Command translates it into
                operating doctrine for the Intelligence Age: visible systems, auditable power,
                appealable decisions, and the unbroken line of human authority over the tools
                built around us.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={PREVIEW_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold border border-primary/55 text-primary px-4 py-2.5 hover:bg-primary hover:text-primary-foreground transition-all tracking-widest uppercase"
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
                Full Release Coming Later
              </span>
            </div>

            <div className="border border-primary/20 bg-primary/[0.03] corner-bracket p-5">
              <div className="font-mono text-[0.6rem] text-primary/85 tracking-widest uppercase mb-2">
                // RELEASE STATUS
              </div>
              <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                Final proof preview available now — the first 24 pages. Full release coming
                later. Store listing and purchase links will publish closer to release.
              </p>
            </div>
          </div>
        </div>

        {/* Preview file access (no inline viewer) */}
        <section className="mt-12">
          <div className="border border-border/40 bg-card/25 corner-bracket p-5 max-w-xl">
            <div className="font-mono text-[0.6rem] text-primary/85 tracking-widest uppercase mb-2">
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
                className="inline-flex items-center gap-2 font-mono text-[0.65rem] font-bold border border-primary/50 text-primary px-3 py-2 hover:bg-primary hover:text-primary-foreground transition-all tracking-widest uppercase"
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
            className="font-mono text-[0.65rem] text-primary hover:underline tracking-widest uppercase"
          >
            ← All Books & Policy Files
          </Link>
        </section>
      </div>
    </div>
  );
}
