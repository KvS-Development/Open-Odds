import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Calculator, BarChart3, Users, GitBranch } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold">Open-Odds</Link>
              <Link href="/scenarios" className="hover:underline">Scenarios</Link>
              <Link href="/about" className="hover:underline">About</Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          {/* Hero Section */}
          <section className="flex flex-col gap-6 items-center text-center">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Visual Probability Distribution Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Build complex scenarios like the Drake equation, input probability distributions for each component, 
              and visualize the results in real-time.
            </p>
            <div className="flex gap-4 mt-4">
              <Link 
                href="/calculator" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
              >
                Start Calculating
              </Link>
              <Link 
                href="/examples" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6"
              >
                View Examples
              </Link>
            </div>
          </section>

          {/* Features Grid */}
          <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-3 p-6 border rounded-lg">
              <Calculator className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Multi-Step Scenarios</h3>
              <p className="text-sm text-muted-foreground">
                Build scenarios with multiple components and see how uncertainties compound
              </p>
            </div>
            
            <div className="flex flex-col gap-3 p-6 border rounded-lg">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Visual Distributions</h3>
              <p className="text-sm text-muted-foreground">
                See probability distributions and their convolutions in real-time
              </p>
            </div>
            
            <div className="flex flex-col gap-3 p-6 border rounded-lg">
              <GitBranch className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Branching Logic</h3>
              <p className="text-sm text-muted-foreground">
                Create scenarios with multiple paths and conditional probabilities
              </p>
            </div>
            
            <div className="flex flex-col gap-3 p-6 border rounded-lg">
              <Users className="h-8 w-8 text-primary" />
              <h3 className="font-semibold">Collaborate</h3>
              <p className="text-sm text-muted-foreground">
                Share scenarios, compare approaches, and learn from the community
              </p>
            </div>
          </section>

          {/* Example Use Cases */}
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Popular Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Drake Equation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Estimate the number of communicating extraterrestrial civilizations in our galaxy
                </p>
                <Link href="/examples/drake" className="text-primary hover:underline text-sm">
                  Try it →
                </Link>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Project Estimation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Calculate project completion times with uncertainty in each phase
                </p>
                <Link href="/examples/project" className="text-primary hover:underline text-sm">
                  Try it →
                </Link>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Investment Returns</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Model investment returns with multiple uncertain factors
                </p>
                <Link href="/examples/investment" className="text-primary hover:underline text-sm">
                  Try it →
                </Link>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Risk Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Evaluate compound risks in complex systems
                </p>
                <Link href="/examples/risk" className="text-primary hover:underline text-sm">
                  Try it →
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="flex flex-col gap-4 items-center text-center py-12">
            <h2 className="text-2xl font-bold">Ready to visualize uncertainty?</h2>
            <p className="text-muted-foreground">
              No sign-up required to start calculating. Create an account to save and share your scenarios.
            </p>
            <Link 
              href="/calculator" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 mt-4"
            >
              Start Building Your First Scenario
            </Link>
          </section>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p className="text-muted-foreground">© 2025 Open-Odds</p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}