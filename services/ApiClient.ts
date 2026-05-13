import { router } from "expo-router";

const API_URL =
  "http://studyconnect-env.eba-wvqpk8ks.us-east-1.elasticbeanstalk.com/api";

export class ApiClient {
  static baseUrl = API_URL;

  static getPublicHeaders() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  static getAuthHeaders(token?: string) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  static async request<T>(
    path: string,
    options: RequestInit = {},
    token?: string,
  ): Promise<T> {
    const finalHeaders = {
      ...(options.headers as Record<string, string> | undefined),
      ...(token ? this.getAuthHeaders(token) : this.getPublicHeaders()),
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: finalHeaders,
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    // 🔐 Manejar token expirado (401)
    if (response.status === 401) {
      console.warn("Token expirado - redirigiendo a login");
      router.replace("/login");
      throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
    }

    if (!response.ok) {
      const message = data?.message || `HTTP ${response.status}`;
      throw new Error(message);
    }

    return data as T;
  }
}
