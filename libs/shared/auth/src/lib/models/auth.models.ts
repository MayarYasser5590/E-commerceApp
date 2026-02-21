export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  phone?: string;
  gender?: string;
  createdAt?: string;
  photo?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}
