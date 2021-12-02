import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfessorsService } from './professors.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoursesComponent } from './courses/courses.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfessorDetailComponent } from './professor-detail/professor-detail.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CoursesComponent,
    PageNotFoundComponent,
    ProfessorDetailComponent,
    ContractDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProfessorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
