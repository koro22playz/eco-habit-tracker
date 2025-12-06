import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../services/habit.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="header">
        <div>
          <h1>🌱 Daily Habits</h1>
          <p class="subtitle">{{ todayDate }}</p>
        </div>
        <div class="progress-circle" [style.--progress]="progress + '%'">
          <div class="progress-value">{{ progress }}%</div>
        </div>
      </div>

      <div class="progress-summary">
        <div class="progress-text">
          <span class="done-count">{{ doneCount }}</span>
          <span class="total-count">/{{ totalCount }} habits completed</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="progress"></div>
        </div>
      </div>

      <div class="habits-list">
        <div class="habit-card"
             *ngFor="let habit of service.habits()"
             [class.done]="todayDone(habit)"
             (click)="toggle(habit)">
          <div class="habit-icon">
            <div class="check-circle" [class.checked]="todayDone(habit)">
              {{ todayDone(habit) ? '✓' : '+' }}
            </div>
          </div>
          <div class="habit-content">
            <h3>{{ habit.name }}</h3>
            <p class="habit-category">{{ habit.category }}</p>
          </div>
          <div class="habit-stats">
            <div class="streak" *ngIf="getStreak(habit) > 0">
              🔥 {{ getStreak(habit) }}d
            </div>
          </div>
        </div>
      </div>

      <div class="motivation">
        <p>💪 "Consistency is the key to results. Keep going!"</p>
      </div>
    </div>
  `,
  styles: [`
    .page { 
      padding: 24px;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }
    
    h1 {
      color: #2c3e50;
      margin: 0 0 4px 0;
      font-size: 28px;
    }
    
    .subtitle {
      color: #7f8c8d;
      margin: 0;
      font-size: 14px;
    }
    
    .progress-circle {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: conic-gradient(#2ecc71 var(--progress), #ecf0f1 0%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    
    .progress-circle::before {
      content: '';
      position: absolute;
      width: 58px;
      height: 58px;
      background: white;
      border-radius: 50%;
    }
    
    .progress-value {
      position: relative;
      z-index: 1;
      color: #2c3e50;
      font-weight: 600;
      font-size: 16px;
    }
    
    .progress-summary {
      background: white;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .progress-text {
      display: flex;
      align-items: baseline;
      margin-bottom: 12px;
    }
    
    .done-count {
      color: #2ecc71;
      font-size: 28px;
      font-weight: 600;
    }
    
    .total-count {
      color: #7f8c8d;
      font-size: 16px;
      margin-left: 4px;
    }
    
    .progress-bar {
      height: 8px;
      background: #ecf0f1;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(to right, #2ecc71, #27ae60);
      border-radius: 4px;
      transition: width 0.3s ease;
    }
    
    .habits-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .habit-card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .habit-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .habit-card.done {
      border-left: 4px solid #2ecc71;
    }
    
    .habit-icon {
      flex-shrink: 0;
    }
    
    .check-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ecf0f1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #7f8c8d;
      transition: all 0.2s ease;
    }
    
    .check-circle.checked {
      background: #2ecc71;
      color: white;
    }
    
    .habit-content {
      flex: 1;
    }
    
    .habit-content h3 {
      color: #2c3e50;
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 500;
    }
    
    .habit-category {
      color: #7f8c8d;
      font-size: 12px;
      margin: 0;
    }
    
    .habit-stats {
      flex-shrink: 0;
    }
    
    .streak {
      background: #ffeaa7;
      color: #e17055;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .motivation {
      margin-top: 32px;
      padding: 16px;
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      border-radius: 12px;
      text-align: center;
    }
    
    .motivation p {
      color: #2c3e50;
      margin: 0;
      font-weight: 500;
    }
  `]
})
export class HomeComponent {
  constructor(public service: HabitService) {}

  get todayDate() {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  todayDone(h: any) {
    return h.history.includes(this.service.today());
  }

  toggle(h: any) {
    this.service.toggle(h);
  }

  get progress() {
    const total = this.service.habits().length;
    const done = this.service.habits().filter(h => this.todayDone(h)).length;
    return Math.round(done / total * 100);
  }

  get doneCount() {
    return this.service.habits().filter(h => this.todayDone(h)).length;
  }

  get totalCount() {
    return this.service.habits().length;
  }

  getStreak(habit: any): number {
    let count = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const day = d.toISOString().split("T")[0];
      if (habit.history.includes(day)) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }
}