import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,_hsl(var(--brand)/0.25),_transparent_70%)]" />
      <div className="container py-20 md:py-28 text-center">
        <p className="mx-auto inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-brand bg-brand/10">
          New • Purple design system
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
          A modern Help & Billing experience
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Beautifully crafted, purple-first UI to manage FAQs, usage insights, and billing support. Optimized for clarity and speed.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button className="bg-gradient-to-r from-brand to-primary">Start Free Trial</Button>
          <Button variant="outline">Explore Help Center</Button>
        </div>
      </div>
    </section>
  );
}
