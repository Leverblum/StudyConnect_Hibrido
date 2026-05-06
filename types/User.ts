export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  created_at?: string;
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
