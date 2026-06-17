export interface BaseUser {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender?: string;
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
  rememberMe?: boolean;
}

export interface ChangePasswordDto {
  password: string;
  newPassword: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  email: string;
  newPassword: string;
}

export interface ChangeRoleDto {
  userId: string;
  role: 'user' | 'admin';
}

// for signin and signup
export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

// for signin and signup
export interface AuthResponseDto {
  message: string;
  user: UserDto;
  token: string;
}

export interface ChangePasswordResponse {
  message: string;
  token: string;
}

export interface UserResponseDto {
  message?: string;
  user: UserDto;
}

export interface PhotoResponseDto {
  message?: string;
  photo?: string;
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
      gender: dto.gender,
      photo: dto.photo,
    };
  }

  static fromResponseDto(dto: AuthResponseDto): AuthResponse {
    return {
      user: this.fromDto(dto.user),
      token: dto.token,
      message: dto.message,
    };
  }

  static fromUserResponseDto(dto: UserDto | UserResponseDto): User {
    return this.fromDto(this.unwrapUserDto(dto));
  }

  static fromPhotoResponseDto(dto: PhotoResponseDto, currentUser: User): User {
    return {
      ...currentUser,
      photo: dto.photo ?? currentUser.photo,
    };
  }

  private static unwrapUserDto(dto: UserDto | UserResponseDto): UserDto {
    return 'user' in dto ? dto.user : dto;
  }

  static toEditProfileDto(user: Partial<BaseUser>): Partial<BaseUser> {
    // This could handle specific mapping if the API expects different names for editing
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    };
  }
}
