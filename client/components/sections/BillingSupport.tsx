import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, Phone, Shield } from "lucide-react";

export default function BillingSupport() {
  const faqs = [
    { q: "How are credits calculated?", a: "Credits are counted per user action and vary by action type." },
    { q: "Can I change my plan anytime?", a: "Yes, you can upgrade or downgrade at any time. Changes take effect at the next billing cycle." },
    { q: "What happens if I exceed my credits?", a: "Overage processing applies only to credits used beyond your plan allocation." },
  ];

  const contacts = [
    { icon: Mail, title: "Email Support", value: "billing@purplex.app" },
    { icon: MessageCircle, title: "Live Chat", value: "Mon–Fri, 9AM–5PM" },
    { icon: Phone, title: "Phone Support", value: "+1 (402) 555‑0102" },
  ];

  return (
    <section id="support" className="container py-16">
      <Card>
        <CardHeader className="text-center items-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand to-primary text-white flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <CardTitle>Billing Help & Support</CardTitle>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Get answers to common billing questions and learn how pricing works.
          </p>
        </CardHeader>
        <CardContent className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-semibold mb-3">Frequently Asked Questions</h3>
            <ul className="space-y-4">
              {faqs.map((f) => (
                <li key={f.q} className="rounded-md border p-4 hover:bg-accent/40 transition-colors">
                  <p className="font-medium">{f.q}</p>
                  <p className="text-sm text-muted-foreground mt-1">{f.a}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold mb-3">Need More Help?</h3>
            {contacts.map(({ icon: Icon, title, value }) => (
              <div key={title} className="flex items-center justify-between rounded-md border p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium leading-none">{title}</p>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">→</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
