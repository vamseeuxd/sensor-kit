import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'ponds/:projectId',
    loadChildren: () => import('./ponds/ponds.module').then( m => m.PondsPageModule)
  },
  {
    path: 'ph-sensors',
    loadChildren: () => import('./ph-sensors/ph-sensors.module').then( m => m.PhSensorsPageModule)
  },
  {
    path: 'dissolved-oxygen-sensors',
    loadChildren: () => import('./dissolved-oxygen-sensors/dissolved-oxygen-sensors.module').then( m => m.DissolvedOxygenSensorsPageModule)
  },
  {
    path: 'turbidity-sensors',
    loadChildren: () => import('./turbidity-sensors/turbidity-sensors.module').then( m => m.TurbiditySensorsPageModule)
  },
  {
    path: 'tds-sensors',
    loadChildren: () => import('./tdssensors/tdssensors.module').then( m => m.TDSSensorsPageModule)
  },
  {
    path: 'temperature-sensors',
    loadChildren: () => import('./temperature-sensors/temperature-sensors.module').then( m => m.TemperatureSensorsPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'ponds',
    loadChildren: () => import('./ponds/ponds.module').then( m => m.PondsPageModule)
  },
  {
    path: 'pond-details/:id',
    loadChildren: () => import('./pond-details/pond-details.module').then( m => m.PondDetailsPageModule)
  },
  {
    path: 'ph-sensors',
    loadChildren: () => import('./ph-sensors/ph-sensors.module').then( m => m.PhSensorsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dissolved-oxygen-sensors',
    loadChildren: () => import('./dissolved-oxygen-sensors/dissolved-oxygen-sensors.module').then( m => m.DissolvedOxygenSensorsPageModule)
  },
  {
    path: 'turbidity-sensors',
    loadChildren: () => import('./turbidity-sensors/turbidity-sensors.module').then( m => m.TurbiditySensorsPageModule)
  },
  {
    path: 'tdssensors',
    loadChildren: () => import('./tdssensors/tdssensors.module').then( m => m.TDSSensorsPageModule)
  },
  {
    path: 'temperature-sensors',
    loadChildren: () => import('./temperature-sensors/temperature-sensors.module').then( m => m.TemperatureSensorsPageModule)
  },
  {
    path: 'pond-details',
    loadChildren: () => import('./pond-details/pond-details.module').then( m => m.PondDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
