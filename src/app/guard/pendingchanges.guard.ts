import { CanDeactivateFn } from '@angular/router';

export const pendingchangesGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
