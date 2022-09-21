import { AuthEffects } from "./effects/user.effects";
import { authReducer, State } from "./reducers/user.reducers";

export  const appReducers = {
  auth: authReducer,
};

export interface AppState {
  auth: State;
}

export  const  appEffects = [AuthEffects];
