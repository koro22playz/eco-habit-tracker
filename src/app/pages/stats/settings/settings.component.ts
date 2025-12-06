import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">

      <h1>⚙️ Settings</h1>

      <button (click)="toggleDark()">
        Toggle Dark Mode
      </button>

      <br><br>

      <button class="danger" (click)="reset()">
        Reset All Habit Data
      </button>

    </div>
  `,
  styles: [`
    .page { padding: 20px; }
    button {
      padding: 12px;
      border-radius: 8px;
      border: none;
      background: #4caf50;
      color: white;
      font-size: 16px;
      cursor: pointer;
    }
    .danger {
      background: #e64545;
    }
  `]
})
export class SettingsComponent {

  constructor(public service: HabitService) {}

  reset() {
    this.service.reset();
    alert("All habit data reset.");
  }
}
