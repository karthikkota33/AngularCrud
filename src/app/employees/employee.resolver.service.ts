import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Employee } from "../models/employee.model";
import { Observable } from "rxjs";
import { EmployeeService } from "./employee.service";
import { Injectable } from "@angular/core";

@Injectable()
export class EmployeeResolverService{
    constructor(private _employeeService: EmployeeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
        return this._employeeService.getEmployees();
    }
}