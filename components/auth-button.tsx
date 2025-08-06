import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/auth/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      <span className="text-sm">Hey, {user.email}!</span>
      <form action={signOut}>
        <Button type="submit" variant="outline" size="sm">
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Link href="/auth/login">
        <Button size="sm" variant="outline">
          Sign In
        </Button>
      </Link>
      <Link href="/auth/sign-up">
        <Button size="sm">
          Sign Up
        </Button>
      </Link>
    </div>
  );
}