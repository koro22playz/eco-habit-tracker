export interface Habit {
  id: number;
  name: string;
  category: string;
  completed: boolean;
  history: string[]; // Record of completion dates YYYY-MM-DD
}
