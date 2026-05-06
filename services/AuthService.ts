import { AuthResponse } from "../types/User";
import { ApiClient } from "./ApiClient";

export class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    return ApiClient.request<AuthResponse>("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  static async register(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    return ApiClient.request<AuthResponse>("/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }
}
