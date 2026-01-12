export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string; // ISO String date
}

export type ViewState = 'LIST' | 'ADD' | 'EDIT';