import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="nav">
      <a routerLink="/home">Home</a>
      <a routerLink="/stats">Stats</a>
      <a routerLink="/settings">Settings</a>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .nav {
      display: flex;
      gap: 20px;
      padding: 15px;
      background: #e8ffe8;
      border-bottom: 1px solid #c8eac8;
      font-size: 18px;
    }
    a { text-decoration: none; color: #2f6a2f; }
  `]
})
export class AppComponent {}
