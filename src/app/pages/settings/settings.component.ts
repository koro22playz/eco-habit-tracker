import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../services/habit.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="header">
        <h1>⚙️ Settings</h1>
        <p class="subtitle">Manage your habit tracker preferences</p>
      </div>

      <div class="settings-card">
        <div class="icon">🗑️</div>
        <div class="content">
          <h3>Reset Habit Data</h3>
          <p class="description">This will permanently delete all your habit history and restore default habits.</p>
          <button class="danger" (click)="reset()">
            Reset All Data
          </button>
        </div>
      </div>

      <div class="info-box">
        <h3>📊 About This App</h3>
        <p>This app is to track and remind us to do a simple healthy habits for ourselves and for the economy. by Tabios, Renz Angelo</p>
      </div>
    </div>
  `,
  styles: [`
    .page { 
      padding: 24px;
      max-width: 600px;
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
    
    .settings-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }
    
    .icon {
      font-size: 32px;
      flex-shrink: 0;
    }
    
    .content h3 {
      color: #2c3e50;
      margin: 0 0 8px 0;
      font-size: 18px;
    }
    
    .description {
      color: #7f8c8d;
      margin-bottom: 16px;
      line-height: 1.5;
    }
    
    button {
      padding: 12px 24px;
      border-radius: 8px;
      border: none;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .danger {
      background: #ff4757;
      color: white;
    }
    
    .danger:hover {
      background: #ff3742;
      transform: translateY(-1px);
    }
    
    .info-box {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 20px;
      border-left: 4px solid #3498db;
    }
    
    .info-box h3 {
      color: #2c3e50;
      margin: 0 0 12px 0;
    }
    
    .info-box p {
      color: #5d6d7e;
      margin-bottom: 8px;
      line-height: 1.5;
    }
  `]
})
export class SettingsComponent {
  constructor(public service: HabitService) {}

  reset() {
    if (confirm("Are you sure you want to reset all habit data? This cannot be undone.")) {
      this.service.reset();
      alert("All habit data has been reset.");
    }
  }
}