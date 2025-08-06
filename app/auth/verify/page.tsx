export default function VerifyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <h1 className="text-2xl font-bold mb-4">Check your email</h1>
      <p className="text-muted-foreground mb-4">
        We've sent you a verification email. Please check your inbox and click the link to verify your account.
      </p>
      <p className="text-sm text-muted-foreground">
        After verifying, you can close this page and sign in.
      </p>
    </div>
  );
}