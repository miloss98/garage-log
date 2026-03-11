import { LoginMetadata } from "@/lib/seo";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = LoginMetadata;

export default function LoginPage() {
  return <LoginForm />;
}
