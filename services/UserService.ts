import { User } from "../types/User";
import { ApiClient } from "./ApiClient";

export class UserService {
  static async getProfile(token: string): Promise<User> {
    return ApiClient.request<User>(
      "/users",
      {
        method: "GET",
      },
      token,
    );
  }

  static async updateProfile(
    token: string,
    userId: number,
    userData: Partial<User>,
  ): Promise<User> {
    return ApiClient.request<User>(
      `/users/${userId}`,
      {
        method: "PUT",
        body: JSON.stringify(userData),
      },
      token,
    );
  }
}
