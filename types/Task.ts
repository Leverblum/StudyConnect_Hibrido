export interface Activity {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  dueDate: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  userId?: string;
  createdAt?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  date: string;
  time?: string;
  location?: string;
  eventType?: "exam" | "class" | "meeting" | "other";
  userId?: string;
  createdAt?: string;
}

/** @deprecated Use Activity instead */
export type Task = Activity;
