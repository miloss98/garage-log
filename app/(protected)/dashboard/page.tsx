import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome back 👋</h1>
      <p className="text-muted-foreground">{user?.email}</p>
    </div>
  );
}
