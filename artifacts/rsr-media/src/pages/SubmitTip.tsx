import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Shield, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const tipSchema = z.object({
  name: z.string().optional(),
  contactMethod: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type TipFormValues = z.infer<typeof tipSchema>;

export default function SubmitTip() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<TipFormValues>({
    resolver: zodResolver(tipSchema),
    defaultValues: {
      name: "",
      contactMethod: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(_values: TipFormValues) {
    setSubmitted(true);
  }

  return (
    <div className="w-full pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="border-b border-border/40 pb-10 mb-14">
          <div className="font-mono text-sm text-primary mb-4 tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            // TIP.INTAKE.SECURE
          </div>
          <div className="flex items-start gap-5">
            <Shield className="w-10 h-10 text-accent mt-2 shrink-0" />
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="heading-submit-tip">
                Submit a Tip
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                RSR Media accepts tips, documents, and firsthand accounts from the public and inside sources.
                Every submission is treated as confidential. We do not log or share contact information without explicit consent.
              </p>
            </div>
          </div>
        </div>

        {/* Source protection notice */}
        <div className="flex items-start gap-3 p-5 border border-primary/20 bg-primary/5 mb-12">
          <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="font-mono text-sm">
            <p className="text-foreground font-medium mb-1">Source Protection Statement</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              All submissions are treated as confidential. RSR Media does not disclose source identities, contact details, or submission metadata
              to third parties without explicit written consent. For sensitive materials, consider using an anonymous or temporary contact method.
            </p>
          </div>
        </div>

        {submitted ? (
          <div
            className="flex flex-col items-center text-center py-20 border border-primary/20 bg-primary/5"
            data-testid="section-tip-success"
          >
            <CheckCircle className="w-14 h-14 text-primary mb-6" />
            <h2 className="font-serif font-bold text-2xl mb-3">Tip Received.</h2>
            <p className="font-mono text-muted-foreground text-sm">
              Your submission has been logged. You may close this window.
            </p>
            <p className="font-mono text-xs text-muted-foreground/60 mt-4">
              // SUBMISSION.STATUS: LOGGED — SOURCE.PROTECTION: ACTIVE
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              data-testid="form-submit-tip"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
                        Name <span className="text-muted-foreground/50">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Anonymous"
                          className="bg-card/30 border-border/50 font-mono text-sm"
                          data-testid="input-tip-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
                        Contact Method <span className="text-muted-foreground/50">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email, Signal, etc."
                          className="bg-card/30 border-border/50 font-mono text-sm"
                          data-testid="input-tip-contact"
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
                        placeholder="Brief description of your tip"
                        className="bg-card/30 border-border/50 font-mono text-sm"
                        data-testid="input-tip-subject"
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
                        placeholder="Provide details about what you're reporting. Be as specific as possible. Attach any relevant context, dates, locations, or names."
                        className="bg-card/30 border-border/50 font-mono text-sm min-h-40 resize-y"
                        data-testid="textarea-tip-message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="font-mono text-sm tracking-wider uppercase w-full md:w-auto"
                  data-testid="button-tip-submit"
                >
                  Submit Tip Securely
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
