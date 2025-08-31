import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Pencil, Plus, Search, Upload, Eye, ThumbsUp, Trash2, CheckCircle2, Save } from "lucide-react";

export type FaqStatus = "pending" | "draft" | "published";
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  views: number;
  helpful: number; // number of helpful votes
  status: FaqStatus;
  createdAt: number;
}

const STORAGE_KEY = "purplex_faqs_v1";

function loadFaqs(): FaqItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultFaqs();
    const parsed = JSON.parse(raw) as FaqItem[];
    return parsed.map((f) => ({ ...f, tags: f.tags || [] }));
  } catch {
    return defaultFaqs();
  }
}

function saveFaqs(items: FaqItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function defaultFaqs(): FaqItem[] {
  return [
    {
      id: crypto.randomUUID(),
      question: "What is your sick child policy?",
      answer:
        "Children who are ill must stay home to prevent the spread of illness.",
      tags: ["policies"],
      views: 54,
      helpful: 41,
      status: "published",
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
    },
    {
      id: crypto.randomUUID(),
      question: "What educational approach do you use?",
      answer: "We combine play-based learning with structured activities.",
      tags: ["curriculum"],
      views: 27,
      helpful: 18,
      status: "published",
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    },
    {
      id: crypto.randomUUID(),
      question: "Do you provide meals?",
      answer: "Healthy snacks are provided daily; lunches are optional.",
      tags: ["food"],
      views: 9,
      helpful: 7,
      status: "draft",
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: crypto.randomUUID(),
      question: "Do you offer part-time care?",
      answer: "Yes, 2–3 days per week options are available.",
      tags: ["enrollment"],
      views: 0,
      helpful: 0,
      status: "pending",
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
    },
  ];
}

type AdminSettings = { allowSubmissions: boolean; enableVoting: boolean; aiAssist: boolean; defaultTags: string };
const SETTINGS_KEY = "purplex_faq_settings_v1";
const loadSettings = (): AdminSettings => {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "") as AdminSettings; } catch { return { allowSubmissions: true, enableVoting: true, aiAssist: false, defaultTags: "" }; }
};
const saveSettings = (s: AdminSettings) => localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState<FaqItem[]>(loadFaqs());
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<FaqStatus | "analytics" | "inbox" | "settings">("published");
  const [settings, setSettings] = useState<AdminSettings>(loadSettings());

  useEffect(() => saveFaqs(faqs), [faqs]);
  useEffect(() => saveSettings(settings), [settings]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const statusFilter = tab === "analytics" || tab === "settings" ? null : tab === "inbox" ? "pending" : tab;
    return faqs.filter((f) =>
      (statusFilter ? f.status === statusFilter : true) &&
      (f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q) || f.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [faqs, query, tab]);

  const totals = useMemo(() => {
    const published = faqs.filter((f) => f.status === "published");
    const views = published.reduce((a, b) => a + b.views, 0);
    const helpful = published.reduce((a, b) => a + b.helpful, 0);
    const helpfulRate = published.length ? Math.round((helpful / Math.max(views, 1)) * 100) : 0;
    return { total: faqs.length, views, helpfulRate };
  }, [faqs]);

  return (
    <main className="container py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">FAQ Management</h1>
          <p className="text-muted-foreground">Manage questions, answers, and their content</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden sm:inline-flex"><Upload className="h-4 w-4 mr-2"/>Upload</Button>
          <NewFaqDialog onCreate={(f)=>setFaqs([f, ...faqs])} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Stat title="Total Questions" value={totals.total} icon={Search} />
        <Stat title="Total Views" value={totals.views} icon={Eye} />
        <Stat title="Helpful Rating" value={`${totals.helpfulRate}%`} icon={ThumbsUp} />
      </div>

      <Tabs value={tab} onValueChange={(v)=>setTab(v as any)} className="mt-8">
        <TabsList className="grid w-full md:w-auto grid-cols-5">
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <div className="mt-6 flex items-center gap-3">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search questions..." className="pl-9"/>
          </div>
        </div>

        <TabsContent value="published" className="mt-6">
          <FaqList
            items={filtered.filter(f=>f.status==="published")}
            onEdit={(u)=>setFaqs(faqs.map(f=>f.id===u.id?u:f))}
            onDelete={(id)=>setFaqs(faqs.filter(f=>f.id!==id))}
            onMove={(id, to)=>setFaqs(faqs.map(f=>f.id===id?{...f,status:to}:f))}
          />
        </TabsContent>

        <TabsContent value="draft" className="mt-6">
          <FaqList
            items={filtered.filter(f=>f.status==="draft")}
            onEdit={(u)=>setFaqs(faqs.map(f=>f.id===u.id?u:f))}
            onDelete={(id)=>setFaqs(faqs.filter(f=>f.id!==id))}
            onMove={(id, to)=>setFaqs(faqs.map(f=>f.id===id?{...f,status:to}:f))}
          />
        </TabsContent>

        <TabsContent value="inbox" className="mt-6">
          <FaqList
            items={filtered}
            onEdit={(u)=>setFaqs(faqs.map(f=>f.id===u.id?u:f))}
            onDelete={(id)=>setFaqs(faqs.filter(f=>f.id!==id))}
            onMove={(id, to)=>setFaqs(faqs.map(f=>f.id===id?{...f,status:to}:f))}
          />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Analytics items={faqs} />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Allow public question submissions</Label>
                  <p className="text-sm text-muted-foreground">Enable users to send new questions to the Inbox.</p>
                </div>
                <Switch checked={settings.allowSubmissions} onCheckedChange={(v)=>setSettings({ ...settings, allowSubmissions: v })} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Enable helpful voting</Label>
                  <p className="text-sm text-muted-foreground">Show helpful count on published answers.</p>
                </div>
                <Switch checked={settings.enableVoting} onCheckedChange={(v)=>setSettings({ ...settings, enableVoting: v })} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">AI assistance for answers</Label>
                  <p className="text-sm text-muted-foreground">Suggest phrasing when creating answers.</p>
                </div>
                <Switch checked={settings.aiAssist} onCheckedChange={(v)=>setSettings({ ...settings, aiAssist: v })} />
              </div>
              <div>
                <Label className="font-medium">Default tags</Label>
                <Input value={settings.defaultTags} onChange={(e)=>setSettings({ ...settings, defaultTags: e.target.value })} placeholder="e.g. billing, enrollment" />
              </div>
              <div className="text-right">
                <Button className="bg-gradient-to-r from-brand to-primary" onClick={()=>saveSettings(settings)}>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

function Stat({ title, value, icon: Icon }: { title: string; value: number | string; icon: any }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-brand/15 text-brand flex items-center justify-center">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function FaqList({ items, onEdit, onDelete, onMove }: {
  items: FaqItem[];
  onEdit: (item: FaqItem)=>void;
  onDelete: (id: string)=>void;
  onMove: (id: string, to: FaqStatus)=>void;
}) {
  if (!items.length) {
    return <p className="text-sm text-muted-foreground">No items match your current filters.</p>;
  }
  return (
    <div className="space-y-3">
      {items.map((f)=> (
        <Card key={f.id}>
          <CardContent className="p-4 flex items-start gap-4">
            <div className="mt-1">
              <CheckCircle2 className="h-5 w-5 text-brand" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium truncate">{f.question}</p>
                <div className="flex items-center gap-2 shrink-0">
                  {f.tags.map((t)=> (
                    <Badge key={t} variant="secondary" className="capitalize">{t}</Badge>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{f.answer}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{f.views} views</span>
                <span className="inline-flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" />{f.helpful} helpful</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <EditFaqDialog item={f} onSave={onEdit} />
              {f.status !== "published" && (
                <Button onClick={()=>onMove(f.id, "published")} size="sm" className="bg-gradient-to-r from-brand to-primary"><Save className="h-4 w-4 mr-2"/>Publish</Button>
              )}
              {f.status !== "draft" && (
                <Button onClick={()=>onMove(f.id, "draft")} size="sm" variant="outline">Move to Draft</Button>
              )}
              {f.status !== "pending" && (
                <Button onClick={()=>onMove(f.id, "pending")} size="sm" variant="outline">Mark Pending</Button>
              )}
              <Button onClick={()=>onDelete(f.id)} size="sm" variant="destructive"><Trash2 className="h-4 w-4 mr-1"/>Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function NewFaqDialog({ onCreate }: { onCreate: (f: FaqItem)=>void }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<FaqStatus>("draft");

  const submit = () => {
    const item: FaqItem = {
      id: crypto.randomUUID(),
      question: question.trim(),
      answer: answer.trim(),
      tags: tags.split(",").map((t)=>t.trim()).filter(Boolean),
      views: 0,
      helpful: 0,
      status,
      createdAt: Date.now(),
    };
    onCreate(item);
    setOpen(false);
    setQuestion("");
    setAnswer("");
    setTags("");
    setStatus("draft");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-brand to-primary"><Plus className="h-4 w-4 mr-2"/>New Q&A</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New FAQ Question</DialogTitle>
          <DialogDescription>Compose a new Q&A, add tags, and choose a status.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Question</label>
            <Input value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder="Enter the FAQ question..." />
          </div>
          <div>
            <label className="text-sm font-medium">Answer</label>
            <Textarea value={answer} onChange={(e)=>setAnswer(e.target.value)} placeholder="Enter the answer to this question..." />
          </div>
          <div>
            <label className="text-sm font-medium">Tags</label>
            <Input value={tags} onChange={(e)=>setTags(e.target.value)} placeholder="Comma separated e.g. policy, billing" />
          </div>
          <div>
            <label className="text-sm font-medium">Status</label>
            <div className="mt-2 flex gap-2">
              {(["draft","published","pending"] as FaqStatus[]).map((s)=> (
                <Button key={s} type="button" variant={status===s?"default":"outline"} onClick={()=>setStatus(s)} className={status===s?"bg-gradient-to-r from-brand to-primary":""}>
                  {s.charAt(0).toUpperCase()+s.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit} disabled={!question.trim() || !answer.trim()} className="bg-gradient-to-r from-brand to-primary">Save Question</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditFaqDialog({ item, onSave }: { item: FaqItem; onSave: (i: FaqItem)=>void }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState(item.question);
  const [answer, setAnswer] = useState(item.answer);
  const [tags, setTags] = useState(item.tags.join(", "));

  const submit = () => {
    onSave({ ...item, question: question.trim(), answer: answer.trim(), tags: tags.split(",").map(t=>t.trim()).filter(Boolean) });
    setOpen(false);
  };

  useEffect(()=>{
    if (open) {
      setQuestion(item.question);
      setAnswer(item.answer);
      setTags(item.tags.join(", "));
    }
  }, [open, item]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"><Pencil className="h-4 w-4 mr-1"/>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit FAQ</DialogTitle>
          <DialogDescription>Update the content and tags for this question.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Question</label>
            <Input value={question} onChange={(e)=>setQuestion(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Answer</label>
            <Textarea value={answer} onChange={(e)=>setAnswer(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Tags</label>
            <Input value={tags} onChange={(e)=>setTags(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit} className="bg-gradient-to-r from-brand to-primary">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Analytics({ items }: { items: FaqItem[] }) {
  const top = [...items]
    .filter((i)=>i.status==="published")
    .sort((a,b)=>b.views-a.views)
    .slice(0,5);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {top.map((q)=> (
            <div key={q.id} className="flex items-center justify-between rounded-md border p-3">
              <p className="truncate mr-4">{q.question}</p>
              <div className="text-sm text-muted-foreground flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{q.views}</span>
                <span className="inline-flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" />{q.helpful}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Popular Search Terms</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">No search data available yet.</CardContent>
      </Card>
    </div>
  );
}
