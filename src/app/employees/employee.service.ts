import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Observable, catchError, delay, map } from "rxjs";
import { of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { of } from 'rxjs/observable/of';

@Injectable()
export class EmployeeService {

    private employeesList: Employee[] = [
        {
            id: 1,
            name: 'Karthik',
            gender: 'Male',
            email: 'test@gmail.com',
            phoneNumber: '9999999999',
            contactPreference: 'Primary',
            dateOfBirth: '23/Sep/1990',
            department: '2',
            isActive: true,
            photoPath: ''
        },
        {
            id: 2,
            name: 'Padma',
            gender: 'Female',
            email: 'test@gmail.com',
            phoneNumber: '9999999999',
            contactPreference: 'Primary',
            dateOfBirth: '23/Aug/1970',
            department: '1',
            isActive: true,
            photoPath: ''
        }
    ];

    constructor(private http: HttpClient) { }

    getEmployees(): Observable<Employee[]> {
        // return of(this.employeesList).pipe(delay(2000)); //commneted as we are using get request
        return this.http.get<Employee[]>('http://localhost:2000/employees')
        .pipe(catchError(console.log("Error")!));
    }

    getEmployeeByID = (employeeId: number) => {
        return this.employeesList.find(x => x.id === employeeId);
    }

    saveEmployee(employee: Employee) {
        if (employee.id === null || employee.id === 0) {
            const maxId = this.employeesList.reduce(function (e1, e2) {
                return (e1.id! > e2.id!) ? e1 : e2
            }).id;
            employee.id = maxId! + 1;
            this.employeesList.push(employee);
        }
        else {
            const foundIndex = this.employeesList.findIndex(e => e.id === employee.id);
            this.employeesList[foundIndex] = employee;
        }

    }

    deleteEmployee = (employeeId: number) => {
        const index = this.employeesList.findIndex(e => e.id === employeeId);
        this.employeesList.splice(index, 1);
    }

}