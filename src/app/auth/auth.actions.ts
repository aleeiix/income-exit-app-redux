import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const setUser = createAction('[AUTH] setUser', props<{ user: User }>());

export const unSetUser = createAction('[AUTH] unSetUser');
