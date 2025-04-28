import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

// Define the app configuration
const appConfig = {
  providers: [
    HttpClientModule, // Include HttpClientModule here
    provideHttpClient(), // For standalone components in Angular 14+
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
