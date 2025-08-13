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
  vcr = viewChild('container', { read: ViewContainerRef })


  constructor() {
    this.employeeStore.loadEmployees();
  }

  deleteEmployee(emp: Employee) {
    if (confirm(`Are you sure you want to delete ${emp.name}?`)) {
      this.employeeStore.deleteEmployee(emp.id);
    }
  }

  openForm(employee?: Employee) {
    this.vcr()?.clear();
    this.#componentRef = this.vcr()?.createComponent(EmployeeFormComponent);
    this.#componentRef?.setInput('title', employee ? "Edit Employee" : "Add Employee");
    if (employee) {
      this.#componentRef?.setInput('newEmployee', { id: employee.id, name: employee.name, department: employee.department, mobile: employee.mobile, isActive: employee.isActive });
    } else {
      this.#componentRef?.setInput('newEmployee', { id: 0, name: '', department: '', mobile: '', isActive: false });
    }

    this.#componentRef?.instance.closed.subscribe(() => {
      this.#componentRef?.destroy();
    })
  }
}
