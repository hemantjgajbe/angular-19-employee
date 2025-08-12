import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Employee {
  name: string;
  department: string;
  phone: string;
}

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  employees: Employee[] = [
    { name: 'John Doe', department: 'Administration', phone: '(171) 555-2222' },
    { name: 'Peter Parker', department: 'Customer Service', phone: '(313) 555-5735' },
    { name: 'Fran Wilson', department: 'Human Resources', phone: '(503) 555-9931' }
  ];

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
      this.employees = this.employees.filter(e => e !== emp);
    }
  }
}
