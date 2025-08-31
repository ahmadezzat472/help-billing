import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section id="cta" className="relative">
      <div className="container py-14">
        <div className="rounded-2xl border overflow-hidden bg-gradient-to-r from-brand/15 via-primary/10 to-brand/15">
          <div className="px-8 py-10 md:px-12 md:py-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-brand font-semibold">Get Started</p>
              <h3 className="text-2xl md:text-3xl font-bold mt-2">Ready to grow with Purplex?</h3>
              <p className="text-muted-foreground mt-2 max-w-2xl">Join teams using Purplex to streamline operations and improve partner communication. Start with our free tier and scale as you grow.</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-brand to-primary">Start Free Trial</Button>
              <Button variant="outline">Schedule Demo</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
