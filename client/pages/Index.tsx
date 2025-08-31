import Hero from "@/components/sections/Hero";
import UsageInsights from "@/components/sections/UsageInsights";
import BillingSupport from "@/components/sections/BillingSupport";
import CTA from "@/components/sections/CTA";

export default function Index() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-accent/30">
      <Hero />
      <UsageInsights />
      <BillingSupport />
      <CTA />
    </main>
  );
}
