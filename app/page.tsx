import { hasEnvVars } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <section className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Open-Odds</h1>
        <p className="text-lg text-foreground/80">
          Visual Probability Distribution Calculator for Complex Scenarios
        </p>
        
        {!hasEnvVars && (
          <div className="bg-destructive/10 border border-destructive px-4 py-3 rounded-md">
            <p className="text-sm text-destructive">
              ⚠️ Environment variables are not configured. Please follow the setup instructions below.
            </p>
          </div>
        )}

        <div className="bg-muted/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Quick Setup</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Create a Supabase project at <a href="https://database.new" target="_blank" className="text-primary underline">database.new</a></li>
            <li>Copy your project URL and anon key from the API settings</li>
            <li>Create a <code className="bg-muted px-2 py-1 rounded">.env.local</code> file with your credentials</li>
            <li>Run <code className="bg-muted px-2 py-1 rounded">npm install</code> to install dependencies</li>
            <li>Run <code className="bg-muted px-2 py-1 rounded">npm run dev</code> to start the development server</li>
          </ol>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-card p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Build Scenarios</h3>
            <p className="text-sm text-muted-foreground">
              Create multi-step scenarios with branching logic and probability distributions.
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Visualize Results</h3>
            <p className="text-sm text-muted-foreground">
              See real-time visual feedback as you adjust parameters and understand uncertainties.
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Collaborate</h3>
            <p className="text-sm text-muted-foreground">
              Share scenarios, compare approaches, and learn from the community.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}