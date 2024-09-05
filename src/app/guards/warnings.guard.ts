import { CanDeactivateFn } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';

export const warningsGuard: CanDeactivateFn<LoginComponent> = (component) => {
  if (component.form && component.form.dirty && component.form.invalid) {
    return window.confirm('¿Deseas descartar los cambios?');
  }
  return true;
};
