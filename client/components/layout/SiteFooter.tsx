import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-10 grid gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <div>
            <img src="/logo.svg" alt="KidsQueue Logo" width={180} height={44} />
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Modern, purple-first help and billing experience to support your
            customers.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Product</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <Link to="/help" className="hover:text-foreground">
                Help Center
              </Link>
            </li>
            <li>
              <a href="#usage" className="hover:text-foreground">
                Usage Insights
              </a>
            </li>
            <li>
              <a href="#support" className="hover:text-foreground">
                Billing Support
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Company</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <a href="#cta" className="hover:text-foreground">
                Start Free Trial
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Status
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-6 text-xs text-muted-foreground flex items-center justify-between">
          <p>© {new Date().getFullYear()} Purplex Inc.</p>
          <div className="space-x-4">
            <Link to="/help" className="hover:text-foreground">
              Help
            </Link>
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
