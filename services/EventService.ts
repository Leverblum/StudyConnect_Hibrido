import { Event } from "../types/Task";
import { ApiClient } from "./ApiClient";

export class EventService {
  static async getEvents(token: string): Promise<Event[]> {
    return ApiClient.request<Event[]>(
      "/events",
      {
        method: "GET",
      },
      token,
    );
  }

  static async getEvent(id: number, token: string): Promise<Event> {
    return ApiClient.request<Event>(
      `/events/${id}`,
      {
        method: "GET",
      },
      token,
    );
  }

  static async createEvent(
    event: Omit<Event, "id" | "created_at">,
    token: string,
  ): Promise<Event> {
    return ApiClient.request<Event>(
      "/events",
      {
        method: "POST",
        body: JSON.stringify(event),
      },
      token,
    );
  }

  static async updateEvent(
    id: number,
    updates: Partial<Event>,
    token: string,
  ): Promise<Event> {
    return ApiClient.request<Event>(
      `/events/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(updates),
      },
      token,
    );
  }

  static async deleteEvent(id: number, token: string): Promise<void> {
    await ApiClient.request<void>(
      `/events/${id}`,
      {
        method: "DELETE",
      },
      token,
    );
  }
}
