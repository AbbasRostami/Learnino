"use client";

import { DashboardQueryError } from "@/components/dashboard/shared/DashboardQueryError";
import { AtSign, Mail } from "lucide-react";
import { useChangeEmailForm } from "./hooks/useChangeEmailForm";
import { ChangeEmailRequestStep } from "./sections/ChangeEmailRequestStep";
import { ChangeEmailVerifyStep } from "./sections/ChangeEmailVerifyStep";

export function SettingsChangeEmail() {
  const {
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
  } = useChangeEmailForm();

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
          <AtSign className="h-4 w-4" aria-hidden="true" />
        </div>
        <h2 className="text-sm font-black text-foreground">
          {t("changeEmail")}
        </h2>
      </div>

      {currentEmail && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/40 border border-border/40 mb-6 max-w-md">
          <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-muted-foreground font-semibold">
              {tDashboard("currentEmailLabel")}
            </span>
            <span className="text-xs font-bold text-foreground truncate">
              {currentEmail}
            </span>
          </div>
        </div>
      )}

      {isProfileError ? (
        <DashboardQueryError
          compact
          onRetry={() => void refetchProfile()}
          isRetrying={isProfileFetching}
        />
      ) : step === "request" ? (
        <ChangeEmailRequestStep
          requestForm={requestForm}
          onSubmitRequest={onSubmitRequest}
          isRequesting={isRequesting}
          t={t}
        />
      ) : (
        <ChangeEmailVerifyStep
          pendingEmail={pendingEmail}
          verifyForm={verifyForm}
          onSubmitVerify={onSubmitVerify}
          isVerifying={isVerifying}
          otpStatus={otpStatus}
          setOtpStatus={setOtpStatus}
          timer={timer}
          formatTime={formatTime}
          isResending={isResending}
          handleResend={handleResend}
          handleCancel={handleCancel}
          t={t}
          tDashboard={tDashboard}
        />
      )}
    </div>
  );
}
