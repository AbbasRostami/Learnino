"use client";

import { useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

type Step = "request" | "reset";

export default function ForgotPasswordView() {
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState<string>("");

  const handleRequestSuccess = (targetEmail: string) => {
    setEmail(targetEmail);
    setStep("reset");
  };

  const handleBackToRequest = () => {
    setStep("request");
  };

  return (
    <div className="w-full max-w-md">
      {step === "request" ? (
        <ForgotPasswordForm onSuccess={handleRequestSuccess} />
      ) : (
        <ResetPasswordForm email={email} onBack={handleBackToRequest} />
      )}
    </div>
  );
}
