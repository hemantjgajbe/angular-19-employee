import { Component, effect, EventEmitter, inject, input, Input, output, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';
import { EmployeeStore } from '../../store/employee.store';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule, NgClass],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  employeeStore = inject(EmployeeStore);
  readonly title = input<string>();

  closed = output<void>()

  newEmployee = input<Employee>({ id: 0, name: '', department: '', mobile: '', isActive: false });

  onSaveEmployee() {
    if (this.newEmployee().id === 0) {
      this.employeeStore.createEmployee(this.newEmployee);
    } else {
      this.employeeStore.updateEmployee(this.newEmployee);
    }
    this.cancel();
  }

  onDeleteEmployee(id: number): void {
    this.employeeStore.deleteEmployee(id);
  }

  cancel() {
    this.closed.emit()
  }
}
