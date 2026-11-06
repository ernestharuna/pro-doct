import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  template: `
    <div>
      <router-outlet />
    </div>
  `
})
export class App {
  protected readonly title = signal('pro-doct');
}
