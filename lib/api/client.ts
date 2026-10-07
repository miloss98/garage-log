import { toApiError } from "./errors";

export { ApiError } from "./errors";

// Browser requests go to our own domain ("/api/..."). next.config.ts rewrites
// them to API_URL, so the auth cookie is first-party. The browser never
// needs the real API URL, which is why it has no NEXT_PUBLIC_ prefix.
const BASE_URL = "/api";

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

export async function apiFetch<T>(
  path: string,
  { method = "GET", body }: ApiOptions = {},
): Promise<T> {
  const isFormData = body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: body && !isFormData ? { "Content-Type": "application/json" } : {},
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) throw await toApiError(res);

  return res.json() as Promise<T>;
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const { url } = await apiFetch<{ url: string }>("/uploads", {
    method: "POST",
    body: formData,
  });
  return url;
}
