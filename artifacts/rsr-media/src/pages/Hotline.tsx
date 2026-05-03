import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { SITE_EMAIL, SITE_PHONE } from '@/config/site';
import { trackTipClick, trackOutboundClick } from '@/lib/analytics';
import { Phone, Mail, AlertTriangle, Shield, Radio, FileText, Users, Mic, CheckCircle, Copy } from 'lucide-react';
import { saveTip, buildMailtoBody, type Tip } from '@/hooks/useTips';

const PHONE_DISPLAY = "+1 (631) 514-2480";
const PHONE_HREF = `tel:${SITE_PHONE}`;

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
  tipType: z.enum(['tip', 'correction', 'concern', 'interview']).default('tip'),
});
type TipForm = z.infer<typeof tipSchema>;

const CALL_RULES = [
  "Stay on topic — be clear and concise",
  "No threats or harassment of any kind",
  "No doxxing of private individuals",
  "Evidence matters — leads with facts",
  "Be respectful of other callers and the host",
];

const USE_CASES = [
  { icon: Radio, label: "CALL IN DURING THE SHOW", desc: "When live broadcasts are active, the hotline accepts call-ins and viewer questions. Callers may be put on air at the host's discretion." },
  { icon: FileText, label: "SUBMIT A TIP", desc: "Off-air tips, story leads, and community concerns can be submitted by phone or the written form below. Voicemails are reviewed." },
  { icon: AlertTriangle, label: "REQUEST A CORRECTION", desc: "If RSR Media published something that needs correction, call or write. Corrections are reviewed and published when warranted." },
  { icon: Users, label: "COMMUNITY CONCERN", desc: "Local issues, infrastructure problems, public accountability questions, or institutional misconduct — anything the public should know about." },
  { icon: Mic, label: "INTERVIEW / GUEST INQUIRY", desc: "Requesting to be a guest or be interviewed? Use the written form or email the newsroom with your name, topic, and contact info." },
];

export default function Hotline() {
  useSEO({ title: "RSR Hotline", description: "Call the RSR Media hotline to submit tips, call in during live shows, or reach the newsroom directly. +1 (631) 514-2480" });

  const [submitted, setSubmitted] = useState(false);
  const [savedTip, setSavedTip] = useState<Tip | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<TipForm>({
    resolver: zodResolver(tipSchema),
    defaultValues: { urgency: 'medium', canContact: false, tipType: 'tip' },
  });

  function onSubmit(data: TipForm) {
    trackTipClick();
    const tip = saveTip({
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      topic: data.topic,
      location: data.location || '',
      summary: data.summary,
      links: data.links || '',
      urgency: data.urgency,
      contactAllowed: data.canContact,
      tipType: data.tipType,
    });
    setSavedTip(tip);
    setSubmitted(true);
    reset();
  }

  function handleEmailFallback() {
    if (!savedTip) return;
    const subject = encodeURIComponent(`RSR TIP — ${savedTip.topic}`);
    const body = encodeURIComponent(buildMailtoBody(savedTip));
    window.location.href = `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
      <div className="container mx-auto px-4 max-w-5xl relative z-10">

        <SectionHeader
          tag="// RSR.HOTLINE.ACTIVE"
          title="RSR HOTLINE"
          subtitle="The public call-in and tip line for RSR Media. Viewers can call during live shows, leave tips, or raise community concerns."
        />

        {/* ── Main Phone Console Card ── */}
        <div
          className="glass-panel corner-bracket border border-border/30 p-8 md:p-10 mb-12"
          style={{ boxShadow: '0 0 32px rgba(16,185,129,0.06), inset 0 1px 0 rgba(255,255,255,0.04)' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-3">
                // PUBLIC HOTLINE — RSR MEDIA
              </div>
              <a
                href={PHONE_HREF}
                onClick={() => trackOutboundClick('Hotline Call CTA', PHONE_HREF)}
                className="block font-mono text-4xl md:text-5xl font-bold text-primary hover:text-primary/80 transition-colors mb-3 tracking-tight"
              >
                {PHONE_DISPLAY}
              </a>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                Call during live shows for audience participation, or leave a voicemail with tips and community concerns. We review all messages.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={PHONE_HREF}
                  onClick={() => trackOutboundClick('Hotline Call Button', PHONE_HREF)}
                  className="inline-flex items-center gap-2 font-mono font-bold tracking-widest uppercase h-11 px-6 text-[0.7rem] border border-primary/50 text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all corner-bracket"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  <Phone className="w-3.5 h-3.5" /> CALL HOTLINE
                </a>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-widest uppercase h-11 px-5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" /> EMAIL NEWSROOM
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-[0.62rem] text-muted-foreground/60 tracking-widest uppercase mb-3">// CALL RULES</div>
              {CALL_RULES.map((rule, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="font-mono text-[0.6rem] text-primary/60 mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}.</span>
                  <span className="font-sans text-sm text-muted-foreground leading-snug">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/20 grid sm:grid-cols-2 gap-3">
            <p className="font-mono text-[0.62rem] text-muted-foreground/50 tracking-widest">
              // We may not answer every call live. Voicemails are reviewed.
            </p>
            <p className="font-mono text-[0.62rem] text-muted-foreground/50 tracking-widest sm:text-right">
              // Calling does not guarantee broadcast use.
            </p>
          </div>
        </div>

        {/* ── Use Cases ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {USE_CASES.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="border border-border/30 bg-card/10 corner-bracket p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-primary/70 shrink-0" />
                <span className="font-mono text-[0.62rem] text-primary/80 tracking-widest uppercase">{label}</span>
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── Written Tip Form / Success State ── */}
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="font-mono text-[0.62rem] text-primary/60 tracking-widest uppercase flex items-center gap-2 mb-6">
              <span className="w-6 h-px bg-primary/40" />
              // SUBMIT WRITTEN TIP
            </div>

            {submitted && savedTip ? (
              /* ── Success State ── */
              <div className="border border-primary/25 bg-primary/5 corner-bracket p-8">
                <div className="flex items-center gap-3 mb-5">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <div className="font-mono font-bold text-sm text-primary tracking-widest uppercase">TIP RECEIVED</div>
                    <div className="font-mono text-[0.6rem] text-muted-foreground/55 tracking-widest mt-0.5">{savedTip.id}</div>
                  </div>
                </div>
                <p className="font-sans text-base text-foreground/80 mb-2">
                  Your tip <strong className="text-foreground">"{savedTip.topic}"</strong> has been saved locally.
                </p>
                <p className="font-mono text-[0.62rem] text-muted-foreground/50 tracking-widest leading-relaxed mb-6">
                  // Stored locally in the operator console on this device until a backend is connected.
                  This is device-local storage — visible to whoever operates this terminal via /admin/tips.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleEmailFallback}
                    className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest uppercase h-10 px-5 border border-border/45 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" /> EMAIL TIP INSTEAD
                  </button>
                  <button
                    onClick={() => { setSubmitted(false); setSavedTip(null); }}
                    className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest uppercase h-10 px-5 border border-primary/30 text-primary hover:bg-primary/10 transition-all"
                  >
                    SUBMIT ANOTHER TIP
                  </button>
                </div>
                <div className="mt-5 pt-4 border-t border-border/20">
                  <Link href="/admin/tips" className="font-mono text-[0.58rem] text-muted-foreground/28 hover:text-muted-foreground/55 tracking-widest uppercase">
                    View in Operator Console →
                  </Link>
                </div>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Submission Type</label>
                  <select {...register('tipType')} className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors">
                    <option value="tip">Tip / Story Lead</option>
                    <option value="correction">Correction Request</option>
                    <option value="concern">Community Concern</option>
                    <option value="interview">Interview / Guest Inquiry</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Name <span className="text-border">(optional)</span></label>
                    <input {...register('name')} type="text" placeholder="Your name" className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Email <span className="text-border">(optional)</span></label>
                    <input {...register('email')} type="email" placeholder="your@email.com" className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors" />
                    {errors.email && <p className="font-mono text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Phone <span className="text-border">(optional)</span></label>
                    <input {...register('phone')} type="tel" placeholder="(000) 000-0000" className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Topic <span className="text-destructive">*</span></label>
                    <input {...register('topic')} type="text" placeholder="e.g. City Council, Infrastructure" className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors" />
                    {errors.topic && <p className="font-mono text-xs text-destructive mt-1">{errors.topic.message}</p>}
                  </div>
                  <div>
                    <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Location <span className="text-border">(optional)</span></label>
                    <input {...register('location')} type="text" placeholder="City, region, or jurisdiction" className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Summary <span className="text-destructive">*</span></label>
                  <textarea {...register('summary')} rows={5} placeholder="Describe what you know, witnessed, or want investigated. Be as specific as possible." className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors resize-y" />
                  {errors.summary && <p className="font-mono text-xs text-destructive mt-1">{errors.summary.message}</p>}
                </div>

                <div>
                  <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Links / Evidence <span className="text-border">(optional)</span></label>
                  <textarea {...register('links')} rows={3} placeholder="URLs, document references, social media links, or other evidence" className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors resize-y" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase mb-2">Urgency</label>
                    <select {...register('urgency')} className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors">
                      <option value="low">LOW — Background context</option>
                      <option value="medium">MEDIUM — Worth investigating</option>
                      <option value="high">HIGH — Time-sensitive</option>
                      <option value="urgent">URGENT — Breaking / immediate</option>
                    </select>
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input {...register('canContact')} type="checkbox" className="w-4 h-4 border border-border bg-background accent-primary" />
                      <span className="font-mono text-xs tracking-wider text-muted-foreground uppercase">RSR Media can contact me</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  <button
                    type="submit"
                    className="font-mono font-bold tracking-widest uppercase h-12 px-8 text-sm border border-primary/50 text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all corner-bracket"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    SUBMIT TIP
                  </button>
                  <a
                    href={`mailto:${SITE_EMAIL}?subject=RSR TIP — [topic]`}
                    className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest uppercase h-12 px-5 border border-border/40 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" /> EMAIL TIP INSTEAD
                  </a>
                </div>
                <p className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest">
                  // Submitting saves to device-local storage (operator console). Email sends directly to newsroom.
                </p>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="border border-destructive/30 bg-destructive/5 p-5 corner-bracket">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="font-mono font-bold text-xs text-destructive tracking-widest uppercase">IMPORTANT WARNING</span>
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Do not submit classified, hacked, stolen, or illegally obtained material. RSR Media cannot accept material whose acquisition would expose sources to criminal liability.
              </p>
            </div>

            <div className="border border-border/40 bg-card/15 p-5 corner-bracket">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-mono font-bold text-xs text-primary tracking-widest uppercase">SOURCE PROTECTION</span>
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                We protect good-faith sources to the extent we are able. You may omit contact information entirely. You do not need to identify yourself to submit a tip.
              </p>
            </div>

            <div className="border border-border/40 bg-card/15 p-5 corner-bracket">
              <div className="flex items-center gap-2 mb-2">
                <Copy className="w-3.5 h-3.5 text-muted-foreground/55" />
                <span className="font-mono font-bold text-xs text-muted-foreground tracking-widest uppercase">STORAGE NOTE</span>
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Written tips are stored locally in this browser. They appear in the operator console at{' '}
                <Link href="/admin/tips" className="text-primary/70 hover:text-primary transition-colors">/admin/tips</Link>.
                No cloud storage until a backend is connected.
              </p>
            </div>

            <div className="border border-border/40 bg-card/15 p-5 corner-bracket space-y-3">
              <div className="font-mono font-bold text-xs text-foreground tracking-widest uppercase">DIRECT CONTACT</div>
              <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hotline Sidebar Call', PHONE_HREF)}
                className="flex items-center gap-3 font-mono text-sm text-primary hover:text-primary/80 transition-colors">
                <Phone className="w-3.5 h-3.5 shrink-0" /> {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${SITE_EMAIL}`}
                className="flex items-center gap-3 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors break-all">
                <Mail className="w-3.5 h-3.5 shrink-0" /> {SITE_EMAIL}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
