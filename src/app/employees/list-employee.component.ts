import { Component } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent {

  employees?: Employee[];

  employeeIndex = 0;
  employeeData: any;
  eventValueFromChild: Employee;
  searchTerm: string;
  constructor(private _employees: EmployeeService, private _router: Router, private _route: ActivatedRoute) {
    this.employees = this._route.snapshot.data['employeeList'];
    if (this.employees) {
      this.employeeData = this.employees[this.employeeIndex];
    }
  }

  ngOnInit() {
    //Moved the above code to constructor as we have implemented Resolver service
    // this._employees.getEmployees().subscribe(
    //   (emp) => {
    //     this.employees = emp
    //     if (this.employees) {
    //       this.employeeData = this.employees[this.employeeIndex];
    //     }
    //   });

  }

  getNextEmployee = () => {
    var count = this.employees?.length;
    if (this.employees) {
      ++this.employeeIndex;
      if (this.employeeIndex <= this.employees.length - 1) {
        this.employeeData = this.employees[this.employeeIndex];
      }
      else {
        this.employeeIndex = 0;
        this.employeeData = this.employees[this.employeeIndex];
      }
    }

    // console.log(this.employeeIndex);
    // console.log(count);
  }

  valueFromChild = (eventValue: Employee) => {
    this.eventValueFromChild = eventValue;
  }

  onCLick = (employeeId?: number) => {
    this._router.navigate(['employee', employeeId]);
  }

}
