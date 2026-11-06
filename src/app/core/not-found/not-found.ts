import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-not-found',
  template: `
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-lg text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
    <a href="/" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Go Back Home</a>
  </div>
  `,
})
export class NotFound { }
