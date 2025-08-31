import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Help() {
  const questions = [
    "What is your sick child policy?",
    "What educational approach do you use?",
    "What is your enrollment process?",
    "Do you provide meals?",
    "What are your operating hours?",
  ];

  return (
    <main className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Help Center</h1>
      <p className="text-muted-foreground text-center mt-2">Find answers to your questions quickly and easily.</p>

      <div className="mt-8 mx-auto max-w-2xl">
        <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input className="w-full bg-transparent outline-none text-sm" placeholder="Search for answers..." />
          <Button className="bg-gradient-to-r from-brand to-primary">Search</Button>
        </div>
      </div>

      <div className="mt-10 mx-auto max-w-3xl space-y-4">
        {questions.map((q) => (
          <div key={q} className="rounded-md border p-4 hover:bg-accent/40 transition-colors">
            <p className="font-medium">{q}</p>
            <p className="text-xs text-muted-foreground">This is a placeholder. Tell us to populate this page with your real FAQs.</p>
          </div>
        ))}
      </div>
    </main>
  );
}
