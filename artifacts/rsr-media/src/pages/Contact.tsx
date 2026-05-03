import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contacts = [
  { label: "General Inquiries", email: "contact@rsrmedia.org", tag: "GENERAL" },
  { label: "Press & Media", email: "press@rsrmedia.org", tag: "PRESS" },
  { label: "Tip Submission", email: "tips@rsrmedia.org", tag: "TIPS" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(_values: ContactFormValues) {
    setSubmitted(true);
  }

  return (
    <div className="w-full pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="border-b border-border/40 pb-10 mb-14">
          <div className="font-mono text-sm text-primary mb-4 tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            // CONTACT.CHANNELS
          </div>
          <div className="flex items-start gap-5">
            <Mail className="w-10 h-10 text-accent mt-2 shrink-0" />
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="heading-contact">
                Contact
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Reach RSR Media through the appropriate channel. For sensitive disclosures or tip submissions, use our
                dedicated tip intake instead.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="font-mono text-xs text-muted-foreground/60 mb-6 tracking-widest">// DIRECT.CHANNELS</div>
              <div className="space-y-4" data-testid="section-contact-channels">
                {contacts.map((c) => (
                  <div key={c.label} className="p-4 border border-border/40 bg-card/20 hover:border-primary/30 transition-colors group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-muted-foreground/60">{c.tag}</span>
                    </div>
                    <p className="font-mono text-sm font-medium mb-1">{c.label}</p>
                    <a
                      href={`mailto:${c.email}`}
                      className="font-mono text-xs text-accent hover:text-primary transition-colors flex items-center gap-1"
                      data-testid={`link-email-${c.tag.toLowerCase()}`}
                    >
                      {c.email} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-xs text-muted-foreground/60 mb-4 tracking-widest">// SOCIAL.CHANNELS</div>
              <div className="space-y-2">
                {[
                  { label: "X / Twitter", handle: "@RSRMedia" },
                  { label: "Telegram", handle: "RSR Intelligence" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    className="flex items-center justify-between p-3 border border-border/30 bg-card/10 hover:border-accent/30 transition-colors group"
                    data-testid={`link-social-${s.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
                  >
                    <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">{s.label}</span>
                    <span className="font-mono text-xs text-accent/60 group-hover:text-accent transition-colors">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="flex flex-col items-center text-center py-20 border border-primary/20 bg-primary/5"
                data-testid="section-contact-success"
              >
                <CheckCircle className="w-14 h-14 text-primary mb-6" />
                <h2 className="font-serif font-bold text-2xl mb-3">Message Received.</h2>
                <p className="font-mono text-muted-foreground text-sm">
                  We will respond via the contact method you provided.
                </p>
                <p className="font-mono text-xs text-muted-foreground/60 mt-4">
                  // MESSAGE.STATUS: LOGGED
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                  data-testid="form-contact"
                >
                  <div className="font-mono text-xs text-muted-foreground/60 mb-2 tracking-widest">// SEND.MESSAGE</div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
                            Name <span className="text-accent">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="bg-card/30 border-border/50 font-mono text-sm"
                              data-testid="input-contact-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
                            Email <span className="text-accent">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              className="bg-card/30 border-border/50 font-mono text-sm"
                              data-testid="input-contact-email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
                          Subject <span className="text-accent">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What is this regarding?"
                            className="bg-card/30 border-border/50 font-mono text-sm"
                            data-testid="input-contact-subject"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
                          Message <span className="text-accent">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message..."
                            className="bg-card/30 border-border/50 font-mono text-sm min-h-36 resize-y"
                            data-testid="textarea-contact-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="font-mono text-sm tracking-wider uppercase w-full"
                    data-testid="button-contact-submit"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
