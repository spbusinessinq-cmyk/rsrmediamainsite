import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { SITE_EMAIL } from '@/config/site';
import { trackTipClick } from '@/lib/analytics';
import { getDisplayPhone, getPhoneHref } from '@/lib/formatPhone';
import { Phone, Mail, AlertTriangle, Shield } from 'lucide-react';

const tipSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  topic: z.string().min(2, 'Topic is required'),
  location: z.string().optional(),
  summary: z.string().min(10, 'Please provide a summary of at least 10 characters'),
  links: z.string().optional(),
  urgency: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  canContact: z.boolean().default(false),
});

type TipForm = z.infer<typeof tipSchema>;

export default function TipLine() {
  useSEO({ title: "Tip Line", description: "Submit tips and community reports to RSR Media. Your identity can be protected." });

  const { register, handleSubmit, formState: { errors } } = useForm<TipForm>({
    resolver: zodResolver(tipSchema),
    defaultValues: { urgency: 'medium', canContact: false },
  });

  const displayPhone = getDisplayPhone();
  const phoneHref = getPhoneHref();

  function onSubmit(data: TipForm) {
    trackTipClick();
    const subject = encodeURIComponent(`RSR TIP LINE SUBMISSION — ${data.topic}`);
    const body = encodeURIComponent(
      [
        `RSR TIP LINE SUBMISSION`,
        `---`,
        `TOPIC: ${data.topic}`,
        `URGENCY: ${data.urgency.toUpperCase()}`,
        data.location ? `LOCATION: ${data.location}` : '',
        `---`,
        `SUMMARY:`,
        data.summary,
        data.links ? `\nLINKS / EVIDENCE:\n${data.links}` : '',
        `---`,
        `CONTACT`,
        data.name ? `Name: ${data.name}` : 'Name: not provided',
        data.email ? `Email: ${data.email}` : 'Email: not provided',
        data.phone ? `Phone: ${data.phone}` : 'Phone: not provided',
        `Can we contact you: ${data.canContact ? 'YES' : 'NO'}`,
      ].filter(Boolean).join('\n')
    );
    window.location.href = `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">

        <SectionHeader
          tag="// SECURE.TIP.INTAKE"
          title="RSR TIP LINE"
          subtitle="Submit tips, community reports, and source material. We review all submissions before acting."
        />

        {/* Hotline Callout Box */}
        <div className="glass-panel corner-bracket border border-primary/30 p-6 md:p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-1">RSR HOTLINE</div>
                {phoneHref ? (
                  <a href={phoneHref} className="font-mono text-xl font-bold text-primary hover:text-primary/80 transition-colors">
                    {displayPhone}
                  </a>
                ) : (
                  <span className="font-mono text-sm text-muted-foreground italic">{displayPhone}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-1">NEWSROOM EMAIL</div>
                <a href={`mailto:${SITE_EMAIL}`} className="font-mono text-sm text-primary hover:underline break-all">
                  {SITE_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* Tip Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Name <span className="text-border">(optional)</span></label>
                  <input {...register('name')} type="text" placeholder="Your name" className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Email <span className="text-border">(optional)</span></label>
                  <input {...register('email')} type="email" placeholder="your@email.com" className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors" />
                  {errors.email && <p className="font-mono text-xs text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Phone <span className="text-border">(optional)</span></label>
                  <input {...register('phone')} type="tel" placeholder="(000) 000-0000" className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Topic <span className="text-destructive">*</span></label>
                  <input {...register('topic')} type="text" placeholder="e.g. City Council, Local Infrastructure" className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors" />
                  {errors.topic && <p className="font-mono text-xs text-destructive mt-1">{errors.topic.message}</p>}
                </div>
                <div>
                  <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Location <span className="text-border">(optional)</span></label>
                  <input {...register('location')} type="text" placeholder="City, region, or jurisdiction" className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Summary <span className="text-destructive">*</span></label>
                <textarea {...register('summary')} rows={5} placeholder="Describe what you know, what you witnessed, or what you want us to investigate. Be as specific as possible." className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors resize-y" />
                {errors.summary && <p className="font-mono text-xs text-destructive mt-1">{errors.summary.message}</p>}
              </div>

              <div>
                <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Links / Evidence <span className="text-border">(optional)</span></label>
                <textarea {...register('links')} rows={3} placeholder="URLs, document references, social media links, or other evidence" className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors resize-y" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Urgency</label>
                  <select {...register('urgency')} className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors">
                    <option value="low">LOW — Background context</option>
                    <option value="medium">MEDIUM — Worth investigating</option>
                    <option value="high">HIGH — Time-sensitive</option>
                    <option value="urgent">URGENT — Breaking / immediate</option>
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input {...register('canContact')} type="checkbox" className="w-4 h-4 border border-border bg-background accent-primary" />
                    <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">RSR Media can contact me about this tip</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto font-serif font-bold tracking-widest uppercase h-12 px-8 text-sm border border-primary/50 text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all corner-bracket"
              >
                SEND TIP VIA EMAIL
              </button>
              <p className="font-mono text-[0.65rem] text-muted-foreground tracking-widest">
                // Opens your email client with the form pre-filled
              </p>

            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            <div className="border border-destructive/30 bg-destructive/5 p-5 corner-bracket">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="font-mono font-bold text-xs text-destructive tracking-widest uppercase">CAUTION</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Do not submit classified, stolen, hacked, or illegally obtained material. RSR Media cannot accept material whose acquisition would expose sources to criminal liability.
              </p>
            </div>

            <div className="border border-border/50 bg-card/20 p-5 corner-bracket">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-mono font-bold text-xs text-primary tracking-widest uppercase">SOURCE PROTECTION</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                We protect good-faith sources to the extent we are able. If you are concerned about your identity, you may omit contact information entirely. You do not need to identify yourself to submit a tip.
              </p>
            </div>

            <div className="border border-border/50 bg-card/20 p-5 corner-bracket">
              <div className="font-mono font-bold text-xs text-foreground tracking-widest uppercase mb-3">COMMUNITY REPORTING</div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                RSR Media accepts tips on local community concerns, public accountability issues, infrastructure problems, institutional misconduct, and public-interest stories of all kinds. You do not need a major story to contact us.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
