export interface Task {
    id: string;
    title: string;
    subjectId: string;
    dueDate: Date;
    completed: boolean;
}