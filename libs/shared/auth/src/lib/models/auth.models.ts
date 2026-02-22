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
  wishlist: any[];
  addresses: any[];
  createdAt: string;
}

export interface SignupCredentials extends BaseUser {
  password: string;
  rePassword?: string;
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
}
