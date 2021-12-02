import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorsComponent } from './professors/professors.component';
import { CoursesComponent } from './courses/courses.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfessorDetailComponent } from './professor-detail/professor-detail.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/professors', pathMatch: 'full' },
  { path: 'professors', component: ProfessorsComponent },
  { path: 'professor/:id', component: ProfessorDetailComponent },
  { path: 'contracts/:id', component: ContractDetailsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  ProfessorsComponent,
  PageNotFoundComponent,
  ProfessorDetailComponent,
  ContractDetailsComponent
]
