export interface Subject {
  id: string;
  name: string;
  color: string;
  userId?: string;
  createdAt?: string;
}

export interface SubjectWithStats extends Subject {
  activitiesCount?: number;
  eventsCount?: number;
}
