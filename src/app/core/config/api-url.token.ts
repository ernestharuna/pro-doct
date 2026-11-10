// So I learned why this could've a token and not a hard-coded string or an import of environment inside the service. 
// The service asks DI for a value, and the app (or a test) decides what that value is. 
// That’s how tests swap in a fake URL without touching the service.
import { InjectionToken } from "@angular/core";
export const API_URL = new InjectionToken<string>('API_URL')