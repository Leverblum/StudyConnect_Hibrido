export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
