import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { EmployeeService } from "./employee.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class EmployeeDetailsCanActivateGuardService {
    constructor(private router: Router, private employeeService: EmployeeService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const employeeExists = !!this.employeeService.getEmployeeByID(+route.paramMap.get('id')!);
        if (employeeExists) {
            return true;
        }
        else {
            this.router.navigate(['/notfound']);
            return false;
        }
    }

    // CanActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     const employeeExists = !!this.employeeService.getEmployeeByID(+route.paramMap.get('id')!);
    //     if (employeeExists) {
    //         return true;
    //     }
    //     else {
    //         this.router.navigate(['/notfound']);
    //         return false;
    //     }
    // }
}