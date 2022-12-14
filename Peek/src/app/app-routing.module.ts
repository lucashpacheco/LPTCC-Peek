
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  ////{
  ////  path: '',
  ////  component: AppComponent,
  ////  children: [
  ////    {
  ////      path: '',
  ////      component: LoginComponent
  ////    }
  ////  ]
  ////},
  //{
  //  path: '',
  //  pathMatch: 'full',
  //  redirectTo: 'login'
  //},
  //{
  //  path: 'register',
  //  component: RegisterComponent
  //},
  //{
  //  path: 'login',
  //  component: LoginComponent,
  //},
  //{
  //  path: 'home',
  //  component: HomeComponent
  //},
  //{
  //  path: 'users',
  //  component: UsersComponent
  //},
  {
    path: '',
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //useHash: true,
    enableTracing: false,
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
