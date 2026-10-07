import ProfileForm from "@/components/profile/ProfileForm";
import { getCurrentUser } from "@/lib/api/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account details
        </p>
      </div>
      <ProfileForm user={user} />
    </div>
  );
}
