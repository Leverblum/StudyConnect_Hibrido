export interface Subject {
  id: number;
  name: string;
  color: string;
  user_id?: number;
  created_at?: string;
}

export interface SubjectWithStats extends Subject {
  activitiesCount?: number;
  eventsCount?: number;
}
