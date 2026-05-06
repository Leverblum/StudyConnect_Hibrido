export interface Activity {
  id: number;
  title: string;
  description?: string;
  subject_id: number;
  due_date: string;
  status: "pending" | "completed";
  created_at?: string;
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  user_id?: number;
  due_date: string;
  status: "pending" | "completed";
  time?: string;
  location?: string;
  eventType?: "exam" | "class" | "meeting" | "other";
  created_at?: string;
}

/** @deprecated Use Activity instead */
export type Task = Activity;
