import { Subject } from "../types/Subject";
import { ApiClient } from "./ApiClient";

export class SubjectService {
  static async getSubjects(token: string): Promise<Subject[]> {
    return ApiClient.request<Subject[]>(
      "/subjects",
      {
        method: "GET",
      },
      token,
    );
  }

  static async getSubject(id: number, token: string): Promise<Subject> {
    return ApiClient.request<Subject>(
      `/subjects/${id}`,
      {
        method: "GET",
      },
      token,
    );
  }

  static async createSubject(
    subject: Omit<Subject, "id" | "user_id" | "created_at">,
    token: string,
  ): Promise<Subject> {
    return ApiClient.request<Subject>(
      "/subjects",
      {
        method: "POST",
        body: JSON.stringify(subject),
      },
      token,
    );
  }

  static async updateSubject(
    id: number,
    updates: Partial<Subject>,
    token: string,
  ): Promise<Subject> {
    return ApiClient.request<Subject>(
      `/subjects/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(updates),
      },
      token,
    );
  }

  static async deleteSubject(id: number, token: string): Promise<void> {
    await ApiClient.request<void>(
      `/subjects/${id}`,
      {
        method: "DELETE",
      },
      token,
    );
  }
}
