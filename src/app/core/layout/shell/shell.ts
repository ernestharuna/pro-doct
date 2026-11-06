import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-shell',
  template: `
  <div class="py-3 px-6 shadow-lg text-gray-800 rounded-xl m-4 border border-gray-100 hover:bg-gray-100 transition-all duration-300">
    <div class="flex flew-row gap-10 items-center">
      <h1 class="text-2xl tracking-tighter font-bold">Pro-Doct</h1>

      <div class="flex gap-4 items-center">
        <a href="#" class="text-xs tracking-tight hover:text-rose-500">Sign In</a>
        <a href="#" class="text-xs tracking-tight hover:text-rose-500">Catalog</a>
      </div>
    </div>
  </div>
  <div class="p-6">
    <router-outlet />
  </div>
`,
})
export class Shell { }
