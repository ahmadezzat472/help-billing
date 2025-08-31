import { Check, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsageInsights() {
  const left = [
    "Automated messages to reduce manual work",
    "Set smart reminders to reduce churn",
    "Enable satisfaction feedback for better engagement",
    "Use data snapshots for performance comparisons",
    "Monitor your usage monthly",
  ];
  const right = [
    "Credits are consumed based on activity type",
    "Single-use actions discount on some views",
    "Profile views and text interactions share credits",
    "Change your monthly cycle on billing date",
    "Unused credits don't roll over",
  ];

  return (
    <section id="usage" className="container py-16">
      <Card className="shadow-xl/30">
        <CardHeader className="items-center text-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand to-primary text-white flex items-center justify-center shadow">
            <TrendingUp className="h-6 w-6" />
          </div>
          <CardTitle className="mt-2">Usage Insights & Optimization</CardTitle>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Understand your usage patterns and optimize your investment. Make smarter decisions with clear insights.
          </p>
        </CardHeader>
        <CardContent className="grid gap-10 md:grid-cols-2">
          <ul className="space-y-3">
            {left.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {right.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
