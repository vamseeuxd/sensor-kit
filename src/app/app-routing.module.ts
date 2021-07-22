import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
    path: 'ponds',
    loadChildren: () => import('./ponds/ponds.module').then( m => m.PondsPageModule)
  },
  {
    path: 'ph-sensors',
    loadChildren: () => import('./ph-sensors/ph-sensors.module').then( m => m.PhSensorsPageModule)
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
    path: 'ph-sensors',
    loadChildren: () => import('./ph-sensors/ph-sensors.module').then( m => m.PhSensorsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
