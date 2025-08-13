import { CommonModule } from '@angular/common';
import { Component, ComponentRef, inject, OnInit, viewChild, ViewChild, ViewContainerRef } from '@angular/core';
import { EmployeeStore } from '../../store/employee.store';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  readonly employeeStore = inject(EmployeeStore);

  searchTerm = "";
  pageSize = this.employeeStore.pageSize();
  pageSizeOptions = [5, 10, 20];

  @ViewChild('formContainer', { read: ViewContainerRef })
  formContainer!: ViewContainerRef;

   #componentRef?: ComponentRef<EmployeeFormComponent>;

  // Dynamic components

  // vcr = inject(ViewContainerRef);
  vcr = viewChild('container', { read: ViewContainerRef })


  constructor() {
    this.employeeStore.loadEmployees();
  }

  addEmployee() {
    alert('Add Employee Clicked');
    // Logic for adding new employee goes here
  }

  editEmployee(emp: Employee) {
    alert(`Editing: ${emp.name}`);
    // Logic for editing employee goes here
  }

  deleteEmployee(emp: Employee) {
    if (confirm(`Are you sure you want to delete ${emp.name}?`)) {
      // this.employees = this.employees.filter(e => e !== emp);
    }
  }

  openForm(employee?: Employee) {
    this.vcr()?.clear();
    this.#componentRef = this.vcr()?.createComponent(EmployeeFormComponent);
    this.#componentRef?.setInput('name', 'Weather');
  }
}
