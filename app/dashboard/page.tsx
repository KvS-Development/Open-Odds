import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calculator, Save, Users, Clock, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/auth/login");
  }

  // TODO: Fetch user's saved scenarios
  // const { data: scenarios } = await supabase
  //   .from("scenarios")
  //   .select("*")
  //   .eq("user_id", user.id)
  //   .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.email}! Manage your saved scenarios and explore community creations.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Link href="/calculator" className="block">
          <div className="p-4 border rounded-lg hover:bg-accent transition-colors">
            <Calculator className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-semibold">New Scenario</h3>
            <p className="text-sm text-muted-foreground">Create a new probability calculation</p>
          </div>
        </Link>
        
        <div className="p-4 border rounded-lg opacity-50">
          <Save className="h-8 w-8 text-primary mb-2" />
          <h3 className="font-semibold">My Scenarios</h3>
          <p className="text-sm text-muted-foreground">Coming soon</p>
        </div>
        
        <div className="p-4 border rounded-lg opacity-50">
          <Users className="h-8 w-8 text-primary mb-2" />
          <h3 className="font-semibold">Community</h3>
          <p className="text-sm text-muted-foreground">Coming soon</p>
        </div>
        
        <div className="p-4 border rounded-lg opacity-50">
          <TrendingUp className="h-8 w-8 text-primary mb-2" />
          <h3 className="font-semibold">Analytics</h3>
          <p className="text-sm text-muted-foreground">Coming soon</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        
        <div className="border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">No saved scenarios yet</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Start by creating your first scenario! You can build complex probability distributions
            like the Drake equation, project estimations, or risk assessments.
          </p>
          
          <Link href="/calculator">
            <Button>Create Your First Scenario</Button>
          </Link>
        </div>
      </div>

      {/* Future Features Preview */}
      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h3 className="font-semibold mb-3">Coming Soon</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✓ Save and load scenarios</li>
          <li>✓ Share scenarios with the community</li>
          <li>✓ Comment and vote on scenarios</li>
          <li>✓ Version history for your scenarios</li>
          <li>✓ Aggregate statistics for similar scenarios</li>
          <li>✓ Export scenarios as images or PDFs</li>
        </ul>
      </div>
    </div>
  );
}