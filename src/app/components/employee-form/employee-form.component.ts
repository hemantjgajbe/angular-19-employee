import { Component, effect, EventEmitter, inject, input, Input, output, Output } from '@angular/core';
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
  readonly name = input<string>();
  readonly department = input<string>();
  readonly mobile = input<number>();
  readonly isActive = input<boolean>();

  closed = output<void>()

  newEmployee: Employee = { id: 0, name: '', department: '', mobile: 0, isActive: false };

  constructor() {
    console.log(this.name());
  }

  onSaveEmployee() {
    if (this.newEmployee.id === 0) {
      this.employeeStore.createEmployee(this.newEmployee);
    } else {
      this.employeeStore.updateEmployee(this.newEmployee);
    }
    this.resetForm();
    this.cancel();
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

  cancel() {
    this.closed.emit()
  }
}
