import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthSession, Credentials, RegisterData } from '../../../shared/models/user';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ credentials: Credentials }>(),
    'Register': props<{ data: RegisterData }>(),
    'Restore Session': emptyProps(),
    'Session Started': props<{ session: AuthSession }>(),
    'Auth Failed': props<{ error: string }>(),
    'Logout': emptyProps(),
  },
});