export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  gender: 'male' | 'female';
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  password: string ;
  newPassword: string ;
}

export interface EditProfileRequest {
  lastName?: string ;
}

export interface ForgotPasswordRequest {
  email: string ;
}

export interface VerifyResetCodeRequest {
  resetCode: string ;
}

export interface ResetPasswordRequest {
  email : string ;
  newPassword : string ;
}

export interface ChangeUserRoleRequest {
  role : string;
}
