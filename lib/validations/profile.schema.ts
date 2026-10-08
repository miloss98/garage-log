import { z } from "zod";
import { CURRENCIES } from "@/lib/constants";

export const profileSchema = z.object({
  full_name: z.string().trim().min(2, "Name must be at least 2 characters"),
  currency: z.enum(CURRENCIES),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
