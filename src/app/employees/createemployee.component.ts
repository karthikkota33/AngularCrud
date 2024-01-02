import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Department } from '../models/departments.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-createemployee',
  templateUrl: './createemployee.component.html',
  styleUrls: ['./createemployee.component.css']
})
export class CreateemployeeComponent {

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;

  departments: Department[] = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'IT' },
    { id: 3, name: 'Payroll' }
  ]

  employee: Employee = {
    id: 0,
    name: "",
    gender: "",
    email: "",
    phoneNumber: "",
    contactPreference: "",
    dateOfBirth: "",
    department: "",
    isActive: false,
    photoPath: "",
    confirmpassword: '',
    password: ''
  };

  photoPath: boolean = false;
  // public email: string = '';
  // // public fullName: string = '';
  // public gender: string = 'male';
  // public phoneNumber: string = '';
  // public contactPfre: string = 'email';
  // isActive = false;
  // department = 2;
  // dob = '';
  photo = "";
  previewText = "Show Preview";

  constructor(private employeeService: EmployeeService, private routerService: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.getEmployee(id);
    })
  }



  // saveEmployee(empForm: NgForm): void {
  //   console.log(empForm.value);
  // }

  getEmployee = (employeeId: number) => {
    if (employeeId === 0) {
      this.employee = {
        id: 0,
        name: "",
        gender: "",
        email: "",
        phoneNumber: "",
        contactPreference: "",
        dateOfBirth: "",
        department: "",
        isActive: false,
        photoPath: "",
        confirmpassword: '',
        password: ''
      }
      this.createEmployeeForm.reset();
    }
    else {
      this.employee = Object.assign({}, this.employeeService.getEmployeeByID(employeeId));
    }
  }

  saveEmployee(): void {
    // console.log(newEmployee);
    const updatedEmployee: Employee = Object.assign({}, this.employee);
    console.log(updatedEmployee);
    this.employeeService.saveEmployee(updatedEmployee);
    this.createEmployeeForm.reset();
    this.routerService.navigate(['list']);
  }

  togglePhoto(): void {
    this.photoPath = !this.photoPath;
    if (this.photoPath) this.previewText = "Hide Preview";
    else this.previewText = "Show Preview";
  }
}
