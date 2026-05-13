import { Activity } from "../types/Task";
import { ApiClient } from "./ApiClient";
import { SubjectService } from "./SubjectService";

export class ActivityService {
  static async getActivities(token: string): Promise<Activity[]> {
    const subjects = await SubjectService.getSubjects(token);
    const allActivities: Activity[] = [];

    for (const subject of subjects) {
      const activities = await ActivityService.getActivitiesBySubject(
        subject.id,
        token,
      );
      allActivities.push(...activities);
    }

    return allActivities;
  }

  static async getActivitiesBySubject(
    subjectId: number,
    token: string,
  ): Promise<Activity[]> {
    return ApiClient.request<Activity[]>(
      `/activities/${subjectId}`,
      {
        method: "GET",
      },
      token,
    );
  }

  static async createActivity(
    activity: Omit<Activity, "id" | "created_at">,
    token: string,
  ): Promise<Activity> {
    return ApiClient.request<Activity>(
      "/activities",
      {
        method: "POST",
        body: JSON.stringify(activity),
      },
      token,
    );
  }

  static async updateActivity(
    id: number,
    updates: Partial<Activity>,
    token: string,
  ): Promise<Activity> {
    return ApiClient.request<Activity>(
      `/activities/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(updates),
      },
      token,
    );
  }

  static async deleteActivity(id: number, token: string): Promise<void> {
    await ApiClient.request<void>(
      `/activities/${id}`,
      {
        method: "DELETE",
      },
      token,
    );
  }
}
