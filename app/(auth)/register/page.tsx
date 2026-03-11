import { RegisterMetadata } from "@/lib/seo";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = RegisterMetadata;

export default function RegisterPage() {
  return <RegisterForm />;
}
