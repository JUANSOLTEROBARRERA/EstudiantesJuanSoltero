import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    //redirectTo: 'home',
    //pathMatch: 'full'
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'account/:studentNumber',
    component: AccountComponent,
    pathMatch: 'full'
  },
  {
    path: 'view-student',
    loadChildren: () => import('./view-student/view-student.module').then( m => m.ViewStudentPageModule)
  },
  {
    path: 'new-student',
    loadChildren: () => import('./new-student/new-student.module').then( m => m.NewStudentPageModule)
  },
  {
    path: 'edit-student',
    loadChildren: () => import('./edit-student/edit-student.module').then( m => m.EditStudentPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
