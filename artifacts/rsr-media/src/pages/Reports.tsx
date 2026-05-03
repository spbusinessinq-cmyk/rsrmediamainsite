import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { EmptyState } from '@/components/ui-system/EmptyState';
import { ShieldCheck, Download } from 'lucide-react';

export default function Reports() {
  useSEO({ title: "Reports", description: "In-depth investigations and field notes." });

  return (
    <div className="w-full pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeader 
          tag="// DEEP.DIVE" 
          title="REPORTS" 
          subtitle="Comprehensive investigations, field notes, and long-form strategic briefs."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Main Sections */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h3 className="font-serif font-bold text-2xl mb-6 border-b border-border/50 pb-4">Investigations</h3>
              <EmptyState title="NO INVESTIGATIONS" message="No investigations published yet. Check back for updates." />
            </section>
            <section>
              <h3 className="font-serif font-bold text-2xl mb-6 border-b border-border/50 pb-4">Briefs</h3>
              <EmptyState title="NO BRIEFS" message="No briefs published yet. Check back for updates." />
            </section>
            <section>
              <h3 className="font-serif font-bold text-2xl mb-6 border-b border-border/50 pb-4">Field Notes</h3>
              <EmptyState title="NO FIELD NOTES" message="No field notes published yet. Check back for updates." />
            </section>
            <section>
              <h3 className="font-serif font-bold text-2xl mb-6 border-b border-border/50 pb-4">Special Reports</h3>
              <EmptyState title="NO SPECIAL REPORTS" message="No special reports published yet. Check back for updates." />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="border border-primary/50 bg-primary/10 p-6 corner-bracket text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-primary/50 bg-background mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-mono font-bold tracking-widest text-primary mb-2 uppercase">RSR VERIFIED</h3>
              <p className="font-sans text-xs text-muted-foreground">
                All long-form reports undergo rigorous cryptographic hashing and source verification before publication.
              </p>
            </div>

            <div className="border border-border/50 bg-card/30 p-6 corner-bracket">
              <h3 className="font-mono font-bold tracking-widest text-foreground mb-4 uppercase flex items-center gap-2">
                <Download className="w-4 h-4" />
                PDF ARCHIVE: PENDING
              </h3>
              <p className="font-sans text-xs text-muted-foreground">
                Print-ready versions of all major reports will be available for secure offline viewing.
              </p>
            </div>

            <div className="border border-border/50 bg-card/30 p-6 corner-bracket">
              <h3 className="font-mono font-bold tracking-widest text-foreground mb-4 uppercase">Source Discipline</h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                We maintain strict chain of custody for all documents. Confidential sources are protected through aggressive anonymization and isolated intake vectors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
