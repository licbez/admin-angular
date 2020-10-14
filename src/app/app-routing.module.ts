import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingEnum } from './app-routing-enum';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { HelpPageComponent } from './components/help-page/help-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: AppRoutingEnum.HELP,
    component: HelpPageComponent,
  },
  {
    path: AppRoutingEnum.USERS,
    data: { lazy: true },
    loadChildren: () => import('./tabs/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutingEnum.USERS_MODERATE,
    data: { lazy: true },
    loadChildren: () => import('./tabs/users-moderate/users-moderate.module').then(m => m.UsersModerateModule),
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutingEnum.CLUBS,
    loadChildren: () => import('./tabs/clubs/clubs.module').then(m => m.ClubsModule),
    canActivate: [AuthGuard],
    data: { lazy: true },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
