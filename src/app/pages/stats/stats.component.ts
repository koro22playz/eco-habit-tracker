import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../services/habit.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="header">
        <h1>📊 Statistics</h1>
        <p class="subtitle">Track your habit journey and progress</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">🔥</div>
          <div class="stat-content">
            <h3>Current Streak</h3>
            <div class="stat-value">{{ streak }} days</div>
            <p class="stat-description">Consecutive days with all habits completed</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <h3>Today's Progress</h3>
            <div class="stat-value">{{ todayProgress }}%</div>
            <p class="stat-description">{{ todayDone }}/{{ totalHabits }} habits completed today</p>
          </div>
        </div>
      </div>

      <div class="chart-section">
        <h2>Weekly Performance</h2>
        <div class="chart">
          <div class="chart-bar" *ngFor="let d of weekly">
            <div class="bar-container">
              <div class="bar" [style.height.%]="d.percent"></div>
              <div class="bar-value">{{ d.done }}/{{ totalHabits }}</div>
            </div>
            <label class="day-label">{{ d.day }}</label>
            <div class="date-label">{{ d.date }}</div>
          </div>
        </div>
      </div>

      <div class="habits-summary">
        <div class="summary-header">
          <h2>Habit Completion Rate</h2>
          <span class="summary-subtitle">Last 7 days</span>
        </div>
        <div class="habits-list">
          <div class="habit-item" *ngFor="let habit of service.habits()">
            <div class="habit-info">
              <span class="habit-name">{{ habit.name }}</span>
              <span class="habit-category">{{ habit.category }}</span>
            </div>
            <div class="completion-rate">
              <div class="rate-bar">
                <div class="rate-fill" [style.width.%]="getHabitCompletion(habit)"></div>
              </div>
              <span class="rate-text">{{ getHabitCompletion(habit) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { 
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
      max-height: 100vh;
      overflow-y: auto;
    }
    
    .page::-webkit-scrollbar {
      width: 8px;
    }
    
    .page::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    .page::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 4px;
    }
    
    .page::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
    
    .header {
      margin-bottom: 32px;
      text-align: center;
    }
    
    h1 {
      color: #2c3e50;
      margin-bottom: 8px;
      font-size: 28px;
    }
    
    .subtitle {
      color: #7f8c8d;
      font-size: 16px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      gap: 16px;
      align-items: center;
    }
    
    .stat-icon {
      font-size: 32px;
      flex-shrink: 0;
    }
    
    .stat-content h3 {
      color: #7f8c8d;
      margin: 0 0 8px 0;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .stat-value {
      color: #2c3e50;
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .stat-description {
      color: #95a5a6;
      font-size: 14px;
      margin: 0;
    }
    
    .chart-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .chart-section h2 {
      color: #2c3e50;
      margin: 0 0 24px 0;
      font-size: 20px;
    }
    
    .chart {
      display: flex;
      gap: 16px;
      height: 200px;
      align-items: flex-end;
    }
    
    .chart-bar {
      flex: 1;
      text-align: center;
    }
    
    .bar-container {
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-bottom: 8px;
    }
    
    .bar {
      width: 100%;
      background: linear-gradient(to top, #3498db, #2980b9);
      border-radius: 4px 4px 0 0;
      transition: height 0.3s ease;
    }
    
    .bar-value {
      font-size: 12px;
      color: #7f8c8d;
      margin-top: 4px;
    }
    
    .day-label {
      display: block;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 4px;
    }
    
    .date-label {
      font-size: 12px;
      color: #95a5a6;
    }
    
    .habits-summary {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .summary-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .summary-header h2 {
      color: #2c3e50;
      margin: 0;
      font-size: 20px;
    }
    
    .summary-subtitle {
      color: #7f8c8d;
      font-size: 14px;
    }
    
    .habits-list {
      max-height: 300px;
      overflow-y: auto;
      padding-right: 8px;
    }
    
    .habits-list::-webkit-scrollbar {
      width: 6px;
    }
    
    .habits-list::-webkit-scrollbar-track {
      background: #f8f9fa;
      border-radius: 3px;
    }
    
    .habits-list::-webkit-scrollbar-thumb {
      background: #dee2e6;
      border-radius: 3px;
    }
    
    .habits-list::-webkit-scrollbar-thumb:hover {
      background: #ced4da;
    }
    
    .habit-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #ecf0f1;
    }
    
    .habit-item:last-child {
      border-bottom: none;
    }
    
    .habit-info {
      display: flex;
      flex-direction: column;
      min-width: 150px;
    }
    
    .habit-name {
      color: #2c3e50;
      font-weight: 500;
    }
    
    .habit-category {
      color: #7f8c8d;
      font-size: 12px;
    }
    
    .completion-rate {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 200px;
    }
    
    .rate-bar {
      flex: 1;
      height: 8px;
      background: #ecf0f1;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .rate-fill {
      height: 100%;
      background: linear-gradient(to right, #2ecc71, #27ae60);
      border-radius: 4px;
      transition: width 0.3s ease;
    }
    
    .rate-text {
      color: #2c3e50;
      font-weight: 500;
      min-width: 40px;
      text-align: right;
    }
  `]
})
export class StatsComponent {
  constructor(public service: HabitService) {}

  get streak() {
    let count = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const day = d.toISOString().split("T")[0];
      if (this.service.habits().every(h => h.history.includes(day))) count++;
      else break;
    }
    return count;
  }

  get weekly() {
    const out: any[] = [];
    const total = this.service.habits().length;

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const date = d.getDate();

      const done = this.service.habits().filter(h => h.history.includes(key)).length;
      out.push({
        day: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()],
        date: date,
        done: done,
        total: total,
        percent: (done / total) * 100
      });
    }

    return out;
  }

  get todayProgress() {
    const total = this.totalHabits;
    const done = this.todayDone;
    return Math.round((done / total) * 100);
  }

  get todayDone() {
    const today = this.service.today();
    return this.service.habits().filter(h => h.history.includes(today)).length;
  }

  get totalHabits() {
    return this.service.habits().length;
  }

  getHabitCompletion(habit: any): number {
    const totalDays = 7;
    const completedDays = habit.history.filter((date: string) => {
      const habitDate = new Date(date);
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      return habitDate >= sevenDaysAgo;
    }).length;
    
    return Math.round((completedDays / totalDays) * 100);
  }
}