export interface BaseUser {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  photo?: string;
}

export interface User extends BaseUser {
  id: string;
  role: 'user' | 'admin';
}

export interface UserDto extends BaseUser {
  _id: string;
  role: string;
  gender: string;
  wishlist: unknown[];
  addresses: unknown[];
  createdAt: string;
}

export interface SignupCredentials extends BaseUser {
  password: string;
  rePassword?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordCredentials {
  email: string;
  newPassword: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  message: string;
  token: string;
}

export interface ChangeRoleDto {
  userId: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthResponseDto {
  message: string;
  user: UserDto;
  token: string;
}

export interface MessageResponse {
  message: string;
}

export class AuthAdapter {
  static fromDto(dto: UserDto): User {
    return {
      id: dto._id,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: (dto.role === 'admin' ? 'admin' : 'user') as 'user' | 'admin',
      phone: dto.phone,
      photo: dto.photo,
    };
  }

  static fromResponseDto(dto: AuthResponseDto): AuthResponse {
    return {
      user: this.fromDto(dto.user),
      token: dto.token,
    };
  }

  static toEditProfileDto(user: Partial<BaseUser>): Partial<BaseUser> {
    // This could handle specific mapping if the API expects different names for editing
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      photo: user.photo,
    };
  }
}
