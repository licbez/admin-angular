import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersModerateComponent } from './users-moderate.component';

const routes: Routes = [
  {
    path: '',
    component: UsersModerateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersModerateRoutingModule { }
