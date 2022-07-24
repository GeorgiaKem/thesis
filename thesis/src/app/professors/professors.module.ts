import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorsComponent } from './professors.component';
import { AuthGuardService } from '../services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    component: ProfessorsComponent,
    canActivate: [AuthGuardService],
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    // ProfessorsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfessorsModule {

}
