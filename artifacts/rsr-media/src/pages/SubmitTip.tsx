import React, { useState } from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { SITE_TIPS_EMAIL, SITE_PHONE } from '@/lib/constants';
import { ShieldAlert } from 'lucide-react';

export default function SubmitTip() {
  useSEO({ title: "Submit a Tip", description: "Secure tip and document intake." });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    location: '',
    summary: '',
    links: '',
    urgency: 'Medium',
    sensitivity: 'Confidential'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.topic || !formData.summary) {
      alert("Topic and summary are required.");
      return;
    }

    const subject = encodeURIComponent(`RSR MEDIA TIP: ${formData.topic} [${formData.urgency}]`);
    
    let body = `URGENCY: ${formData.urgency}\n`;
    body += `SENSITIVITY: ${formData.sensitivity}\n`;
    body += `LOCATION: ${formData.location || 'N/A'}\n\n`;
    
    body += `SUMMARY:\n${formData.summary}\n\n`;
    
    if (formData.links) {
      body += `SUPPORTING LINKS:\n${formData.links}\n\n`;
    }
    
    body += `--- CONTACT INFO (Optional) ---\n`;
    body += `Name: ${formData.name || 'Anonymous'}\n`;
    body += `Email: ${formData.email || 'N/A'}\n`;
    body += `Phone: ${formData.phone || 'N/A'}\n`;

    const mailto = `mailto:${SITE_TIPS_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeader 
          tag="// TIP.INTAKE.SECURE" 
          title="SUBMIT INTELLIGENCE" 
          subtitle="RSR Media accepts tips, documents, and firsthand accounts from the public and inside sources."
        />

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-1 border border-amber-500/30 bg-amber-500/5 p-6 corner-bracket">
            <h3 className="font-mono font-bold text-amber-500 mb-2 flex items-center gap-2 tracking-widest text-sm uppercase">
              <ShieldAlert className="w-4 h-4" />
              Source Protection
            </h3>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              Every submission is treated as confidential. We do not log or share contact information without explicit consent. For highly sensitive material, use an anonymous proton or tutanota email address over Tor.
            </p>
          </div>
          <div className="flex-1 border border-border/50 bg-card/30 p-6 corner-bracket">
            <h3 className="font-mono font-bold text-foreground mb-2 tracking-widest text-sm uppercase">
              Direct Contact
            </h3>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4">
              For encrypted communication options or immediate dispatch:
            </p>
            <div className="font-mono text-sm text-primary">
              EMAIL: {SITE_TIPS_EMAIL}<br/>
              PHONE: {SITE_PHONE}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="border border-border bg-card/20 p-8 corner-bracket">
          <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-8 pb-4 border-b border-border/30">
            // INTAKE.FORM (Submits via local mail client)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <h4 className="font-mono font-bold text-sm tracking-widest uppercase mb-4 text-primary">Metadata</h4>
              
              <div className="space-y-1">
                <label className="font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">Topic / Headline <span className="text-accent">*</span></label>
                <input required type="text" name="topic" value={formData.topic} onChange={handleInputChange} className="w-full bg-background border border-border p-2.5 font-sans text-sm focus:border-primary outline-none" placeholder="Brief subject..." />
              </div>
              
              <div className="space-y-1">
                <label className="font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">Location / Geography</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-background border border-border p-2.5 font-sans text-sm focus:border-primary outline-none" placeholder="City, Region, Node..." />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">Urgency</label>
                <select name="urgency" value={formData.urgency} onChange={handleInputChange} className="w-full bg-background border border-border p-2.5 font-mono text-sm focus:border-primary outline-none">
                  <option value="Low">Low (Archival)</option>
                  <option value="Medium">Medium (Developing)</option>
                  <option value="High">High (Time-sensitive)</option>
                  <option value="Urgent">Urgent (Active Event)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">Source Sensitivity</label>
                <select name="sensitivity" value={formData.sensitivity} onChange={handleInputChange} className="w-full bg-background border border-border p-2.5 font-mono text-sm focus:border-primary outline-none">
                  <option value="Public">Public / Open Source</option>
                  <option value="Confidential">Confidential (Protect Identity)</option>
                  <option value="Anonymous">Anonymous</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h4 className="font-mono font-bold text-sm tracking-widest uppercase mb-4 text-primary">Intelligence</h4>
              
              <div className="space-y-1">
                <label className="font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">Summary <span className="text-accent">*</span></label>
                <textarea required name="summary" value={formData.summary} onChange={handleInputChange} className="w-full bg-background border border-border p-3 font-sans text-sm focus:border-primary outline-none min-h-[160px] resize-y" placeholder="Detail the event, findings, or allegations. Be specific." />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">Supporting Links / Evidence URLs</label>
                <textarea name="links" value={formData.links} onChange={handleInputChange} className="w-full bg-background border border-border p-3 font-mono text-xs focus:border-primary outline-none min-h-[80px] resize-y" placeholder="https://..." />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/30 space-y-6">
            <h4 className="font-mono font-bold text-sm tracking-widest uppercase text-primary">Optional Contact (If follow-up permitted)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-background border border-border p-2.5 font-sans text-sm focus:border-primary outline-none" placeholder="Name or Alias" />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-background border border-border p-2.5 font-sans text-sm focus:border-primary outline-none" placeholder="Email Address" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-background border border-border p-2.5 font-sans text-sm focus:border-primary outline-none" placeholder="Phone or Signal Number" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
              <p className="font-mono text-xs text-muted-foreground max-w-lg">
                <strong className="text-foreground">CAUTION:</strong> Do not submit classified national security material, stolen financial data, or illegally obtained intercept records through this form.
              </p>
              <button type="submit" className="font-serif font-bold tracking-widest uppercase h-12 px-8 text-sm bg-primary/10 text-primary border border-primary/50 hover:bg-primary hover:text-primary-foreground hover:glow-primary transition-all corner-bracket shrink-0 whitespace-nowrap">
                DISPATCH TO SECURE DESK
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
