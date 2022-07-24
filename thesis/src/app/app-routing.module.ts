import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorsComponent } from './professors/professors.component';
import { CoursesComponent } from './courses/courses.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfessorDetailComponent } from './professor-detail/professor-detail.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { PermitDetailsComponent } from './permit-details/permit-details.component';
import { LoginComponent } from './login/login.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'professors',
    loadChildren: () => import('./professors/professors.module').then(m => m.ProfessorsModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  // { path: 'professors', redirectTo: '/professors', pathMatch: 'full' },
  // { path: 'professors', component: ProfessorsComponent },
  { path: 'professor/:id', component: ProfessorDetailComponent },
  { path: 'contracts/:id', component: ContractDetailsComponent },
  { path: 'permits/:id', component: PermitDetailsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  // ProfessorsComponent,
  PageNotFoundComponent,
  ProfessorDetailComponent,
  ContractDetailsComponent
]
