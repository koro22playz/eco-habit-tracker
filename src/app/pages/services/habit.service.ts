import { Injectable, signal } from '@angular/core';

export interface Habit {
  id: number;
  name: string;
  category: string;
  history: string[];
}

@Injectable({ providedIn: 'root' })
export class HabitService {
  habits = signal<Habit[]>(this.loadHabits());

  today() {
    return new Date().toISOString().split("T")[0];
  }

  // ----------------- STORAGE -----------------
  loadHabits(): Habit[] {
    return JSON.parse(localStorage.getItem('eco-habits') || '[]').length
      ? JSON.parse(localStorage.getItem('eco-habits') || '[]')
      : [
          { id: 1, name: "Recycle", category: "Waste", history: [] },
          { id: 2, name: "Reusable bottle", category: "Lifestyle", history: [] },
          { id: 3, name: "Short shower", category: "Water", history: [] },
          { id: 4, name: "Bike instead of drive", category: "Transport", history: [] }
        ];
  }

  saveHabits() {
    localStorage.setItem('eco-habits', JSON.stringify(this.habits()));
  }

  // ----------------- HABITS -----------------
  toggle(habit: Habit) {
    const today = this.today();

    const updated = this.habits().map(h => {
      if (h.id !== habit.id) return h;

      const isDone = h.history.includes(today);
      const history = isDone
        ? h.history.filter(d => d !== today)
        : [...h.history, today];

      return { ...h, history };
    });

    this.habits.set(updated);
    this.saveHabits();
  }

  reset() {
    localStorage.removeItem('eco-habits');
    this.habits.set(this.loadHabits());
  }
}