import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";

// Shared by the user menu, the sidebar and the demo banner
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return async function logout(redirectTo = "/login") {
    // Even if the request fails (e.g. token already expired), still leave.
    await apiFetch("/auth/logout", { method: "POST" }).catch(() => {});
    // Drop cached cars so the next user on this browser can't see them.
    queryClient.clear();
    router.push(redirectTo);
    router.refresh();
  };
}
