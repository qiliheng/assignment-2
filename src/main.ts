import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Provide the router with your routes
    provideHttpClient(),    // Enable HttpClient without fetch API
  ],
}).catch(err => console.error(err));
