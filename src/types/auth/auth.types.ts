// ==================== Register ====================

export type RegisterPayload = {
  email: string;
  password: string;
  name?: string;
};

export type RegisterResponse = {
  status: "success";
  data: {
    email: string;
    message: string;
  };
};

// ==================== Verify Email ====================

export type VerifyEmailPayload = {
  email: string;
  code: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

export type VerifyEmailResponse = {
  status: "success";
  data: {
    message: string;
    accessToken: string;
    user: User;
  };
};

// ==================== Login ====================

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: "success";
  data: {
    message: string;
    accessToken: string;
    user: User;
  };
};

// ==================== Refresh ====================

export type RefreshResponse = {
  status: "success";
  data: {
    message: string;
    accessToken: string;
  };
};

// ==================== Logout ====================

export type LogoutResponse = {
  status: "success";
  data: {
    message: string;
  };
};

// ==================== Forgot Password ====================

export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = {
  status: "success";
  data: {
    message: string;
  };
};

// ==================== Reset Password ====================

export type ResetPasswordPayload = {
  email: string;
  code: string;
  newPassword: string;
};

export type ResetPasswordResponse = {
  status: "success";
  data: {
    message: string;
  };
};

// ==================== Resend Verification ====================

export type ResendVerificationPayload = {
  email: string;
};

export type ResendVerificationResponse = {
  status: "success";
  data: {
    message: string;
  };
};

// ==================== Resend Reset Code ====================

export type ResendResetCodePayload = {
  email: string;
};

export type ResendResetCodeResponse = {
  status: "success";
  data: {
    message: string;
  };
};

// ==================== Change Password ====================

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type ChangePasswordResponse = {
  status: "success";
  data: {
    message: string;
  };
};

// ==================== Request Change Email ====================

export type RequestChangeEmailPayload = {
  newEmail: string;
  password: string;
};

export type RequestChangeEmailResponse = {
  status: "success";
  data: {
    message: string;
    newEmail: string;
  };
};

// ==================== Verify Change Email ====================

export type VerifyChangeEmailPayload = {
  code: string;
};

export type VerifyChangeEmailResponse = {
  status: "success";
  data: {
    message: string;
    newEmail: string;
  };
};

// ==================== Resend Change Email Code ====================

export type ResendChangeEmailResponse = {
  status: "success";
  data: {
    message: string;
    newEmail: string;
  };
};
