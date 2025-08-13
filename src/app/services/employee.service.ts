import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    private employeeList: Employee[] = [
        { id: 1, name: 'John Doe', department: 'test1', mobile: "1234", isActive: true },
        { id: 2, name: 'Jane Smith', department: 'test2', mobile: "12343", isActive: true }
    ]

    getEmployees(): Observable<Employee[]> {
        return of(this.employeeList);
    }

    createEmployee(employee: Employee): Observable<Employee> {
        employee.id = Math.random();
        this.employeeList = [...this.employeeList, employee]
        return of(employee)
    }

    updatedEmployee(updatedEmployee: Employee): Observable<Employee> {
        this.employeeList = this.employeeList.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
        return of(updatedEmployee);
    }

    deleteEmployee(id: number): Observable<number> {
        this.employeeList = this.employeeList.filter(emp => emp.id === id);
        return of(id);
    }
}