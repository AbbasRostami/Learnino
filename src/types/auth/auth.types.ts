import { ApiSuccessResponse } from "../common";

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

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = ApiSuccessResponse<{
  message: string;
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    role: "USER" | "ADMIN";
  };
}>;

export type RefreshResponse = {
  status: "success";
  data: {
    message: string;
    accessToken: string;
  };
};

export type LogoutResponse = {
  status: "success";
  data: {
    message: string;
  };
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = {
  status: "success";
  data: {
    message: string;
  };
};

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

export type ResendVerificationPayload = {
  email: string;
};

export type ResendVerificationResponse = {
  status: "success";
  data: {
    message: string;
  };
};

export type ResendResetCodePayload = {
  email: string;
};

export type ResendResetCodeResponse = {
  status: "success";
  data: {
    message: string;
  };
};

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

export type ResendChangeEmailResponse = {
  status: "success";
  data: {
    message: string;
    newEmail: string;
  };
};
