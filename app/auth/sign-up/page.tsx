import { SignUpForm } from "@/components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
        <SignUpForm />
      </div>
    </div>
  );
}