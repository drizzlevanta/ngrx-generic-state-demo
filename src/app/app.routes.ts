import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { pageAUIFeature } from './+state/page-a-ui.state';
import { pageBUIFeature } from './+state/page-b-ui.state';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'page-a', pathMatch: 'full' },
  {
    path: 'page-a',
    loadComponent: () =>
      import('./pages/page-a/page-a.component').then(
        (m) => m.PageAComponent
      ),
    providers: [provideState(pageAUIFeature)],
  },
  {
    path: 'page-b',
    loadComponent: () =>
      import('./pages/page-b/page-b.component').then(
        (m) => m.PageBComponent
      ),
    providers: [provideState(pageBUIFeature)],
  },
];
