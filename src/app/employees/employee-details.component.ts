import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  employee: Employee;
  id = 0;
  constructor(private _route: ActivatedRoute, private _employeeService: EmployeeService) {

  }

  ngOnInit() {
    const id1 = +this._route.snapshot.paramMap.get('id')!;
    this.employee = this._employeeService.getEmployeeByID(id1)!;
  }

  nextEmployee: () =>{

  }

}
