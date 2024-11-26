import { CanActivateFn } from '@angular/router';

export const nologueadoGuard: CanActivateFn = (route, state) => {
  return true;
};
