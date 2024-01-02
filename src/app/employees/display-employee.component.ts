import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent {


  @Input() employeeInput: Employee;

  //child to parent
  // @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();

  employeeId: number;

  constructor(private _route: ActivatedRoute, private _router: Router,
    private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeId = +this._route.snapshot.paramMap.get('id')!;
    console.log(this.employeeId);
  }

  backToParent = () => {
    // this.notify.emit(this.employeeInput.name);
    this.notify.emit(this.employeeInput);
  }

  viewDetails = () => {
    this._router.navigate(['employee', this.employeeInput.id]);
  }

  editDetails = () => {
    this._router.navigate(['edit', this.employeeInput.id]);
  }

  deleteEmployee = () => {
    this._employeeService.deleteEmployee(this.employeeInput.id!);
  }

  //detect changes using getter, setter

  // private _employee: Employee;
  // @Input()
  // set employeeInput(val: Employee) {
  //   this._employee = val;
  // }

  // get employeeInput(): Employee {
  //   return this._employee;
  // }


  // ngOnChanges(changes: SimpleChanges): void {

  //   // const previousValue = 'NULL';
  //   // if(changes.employeeInput){

  //   // }
  //   console.log(changes);
  // }
}
