import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '@app/auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard]},
  {
    path: 'login',
    loadChildren: () => import('@app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home', loadChildren: () => import('@app/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]},
  {
    path: 'minerador',
    loadChildren: () => import('@app/minerador/minerador.module').then(m => m.MineradorModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'classificador',
    loadChildren: () => import('@app/classificador/classificador.module').then(m => m.ClassificadorModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

export const RoutingApp = RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true});
