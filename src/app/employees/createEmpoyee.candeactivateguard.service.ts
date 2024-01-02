import { CanDeactivateFn } from "@angular/router";
import { CreateemployeeComponent } from "./createemployee.component";
import { Injectable } from "@angular/core";

@Injectable()
export class CreateemployeeDeActivateGuardService {
    canDeactivate(component: CreateemployeeComponent): boolean {
        // CanDeactivateFn = (component: CreateemployeeComponent) => boolean{
        if (component.createEmployeeForm.dirty) {
            return confirm('Are you sure you want to discard your changes?');
        }
        return true;
    }
}