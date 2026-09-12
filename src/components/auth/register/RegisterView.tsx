"use client";

import { useState } from "react";
import VerifyOtpForm from "../verify-email/VerifyOtpForm";
import RegisterForm from "./RegisterForm";

type Step = "register" | "verify";

export default function RegisterView() {
  const [step, setStep] = useState<Step>("register");
  const [email, setEmail] = useState<string>("");

  const handleRegisterSuccess = (registeredEmail: string) => {
    setEmail(registeredEmail);
    setStep("verify");
  };

  const handleBackToRegister = () => {
    setStep("register");
  };

  return (
    <div className="w-full max-w-md">
      {step === "register" ? (
        <RegisterForm onSuccess={handleRegisterSuccess} />
      ) : (
        <VerifyOtpForm email={email} onBack={handleBackToRegister} />
      )}
    </div>
  );
}
