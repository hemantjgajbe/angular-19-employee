import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';
import { EmployeeStore } from '../../store/employee.store';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  employeeStore = inject(EmployeeStore);

  @Output() close = new EventEmitter<boolean>();

  newEmployee: Employee = { id: 0, name: '', department: '', mobile: 0, isActive: false };

  onSaveEmployee() {
    if (this.newEmployee.id === 0) {
      this.employeeStore.createEmployee(this.newEmployee);
    } else {
      this.employeeStore.updateEmployee(this.newEmployee);
    }
    this.resetForm();
  }

  onEditEmployee(employee: Employee): void {
    this.newEmployee = { ...employee};
  }

  onDeleteEmployee(id: number): void {
    this.employeeStore.deleteEmployee(id);
  }

  resetForm() {
    this.newEmployee = { id: 0, name: '', department: '', mobile: 0, isActive: false }
  }
}
