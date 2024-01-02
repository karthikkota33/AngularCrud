import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListEmployeeComponent } from './employees/list-employee.component';
import { CreateemployeeComponent } from './employees/createemployee.component';
import { ConfirmEqualValidatorDirective } from './shared/confirm.equalValidator.directive';
import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { CreateemployeeDeActivateGuardService } from './employees/createEmpoyee.candeactivateguard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeResolverService } from './employees/employee.resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsCanActivateGuardService } from './employees/employee-details-CanActivateguard.service';
import { TestProgramsComponent } from './test-programs/test-programs.component';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListEmployeeComponent,
    resolve: { employeeList: EmployeeResolverService }
  },
  { path: 'edit/:id', component: CreateemployeeComponent, canDeactivate: [CreateemployeeDeActivateGuardService] },
  { path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeDetailsCanActivateGuardService] },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: 'testprograms', component: TestProgramsComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    CreateemployeeComponent,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    TestProgramsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService, CreateemployeeDeActivateGuardService,
    EmployeeResolverService, EmployeeDetailsCanActivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
