"use client";

import {
  getRequestChangeEmailSchema,
  getVerifyChangeEmailSchema,
} from "@/schemas";
import {
  useProfile,
  useRequestChangeEmail,
  useResendChangeEmailCode,
  useVerifyChangeEmail,
} from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export type Step = "request" | "verify";
export type OtpStatus = "idle" | "error" | "success";

export function useChangeEmailForm() {
  const t = useTranslations("auth");
  const tDashboard = useTranslations("dashboard");

  const {
    data: profileData,
    isError: isProfileError,
    isFetching: isProfileFetching,
    refetch: refetchProfile,
  } = useProfile();
  const currentEmail = profileData?.data?.profile?.email;

  const [step, setStep] = useState<Step>("request");
  const [pendingEmail, setPendingEmail] = useState("");
  const [timer, setTimer] = useState(120);
  const [otpStatus, setOtpStatus] = useState<OtpStatus>("idle");

  const requestSchema = getRequestChangeEmailSchema(t);
  type RequestFormValues = z.infer<typeof requestSchema>;

  const requestForm = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { newEmail: "", password: "" },
    mode: "onChange",
  });

  const { mutate: requestChange, isPending: isRequesting } =
    useRequestChangeEmail({
      onSuccessCallback: (emailFromApi) => {
        if (emailFromApi) setPendingEmail(emailFromApi);
        setStep("verify");
        setTimer(120);
        setOtpStatus("idle");
        requestForm?.reset();
      },
    });

  const verifySchema = getVerifyChangeEmailSchema(t);
  type VerifyFormValues = z.infer<typeof verifySchema>;

  const verifyForm = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
    mode: "onChange",
  });

  const { mutate: verifyChange, isPending: isVerifying } = useVerifyChangeEmail(
    {
      onSuccessCallback: () => {
        setOtpStatus("success");
      },
      onErrorCallback: (error) => {
        setOtpStatus("error");
        verifyForm?.setError("code", {
          type: "manual",
          message: error?.message || t("errorGeneral"),
        });

        if (error?.status === 404) {
          setTimeout(() => {
            handleCancel();
          }, 1500);
        } else {
          setTimeout(() => {
            verifyForm?.setValue("code", "");
            setOtpStatus("idle");
          }, 600);
        }
      },
    },
  );

  const { mutate: resendCode, isPending: isResending } =
    useResendChangeEmailCode();

  useEffect(() => {
    if (step !== "verify" || timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec?.toString()?.padStart(2, "0")}`;
  };

  const onSubmitRequest = (values: RequestFormValues) => {
    if (values?.newEmail === currentEmail) {
      requestForm.setError("newEmail", {
        type: "manual",
        message: tDashboard("sameAsCurrentEmail"),
      });
      return;
    }
    setPendingEmail(values.newEmail);
    requestChange(values);
  };

  const onSubmitVerify = (values: VerifyFormValues) => {
    setOtpStatus("idle");
    verifyChange(values);
  };

  const handleCancel = () => {
    setStep("request");
    setPendingEmail("");
    setTimer(120);
    setOtpStatus("idle");
    verifyForm?.reset();
    requestForm?.reset();
  };

  const handleResend = () => {
    if (timer > 0 || isResending || isVerifying) return;

    resendCode(undefined, {
      onSuccess: () => {
        setTimer(120);
        verifyForm?.setValue("code", "");
        verifyForm?.clearErrors("code");
        setOtpStatus("idle");
      },
      onError: (error) => {
        if (error?.status === 400) {
          handleCancel();
        }
      },
    });
  };

  return {
    t,
    tDashboard,
    currentEmail,
    isProfileError,
    isProfileFetching,
    refetchProfile,
    step,
    pendingEmail,
    timer,
    otpStatus,
    setOtpStatus,
    requestForm,
    verifyForm,
    isRequesting,
    isVerifying,
    isResending,
    onSubmitRequest,
    onSubmitVerify,
    handleCancel,
    handleResend,
    formatTime,
  };
}
