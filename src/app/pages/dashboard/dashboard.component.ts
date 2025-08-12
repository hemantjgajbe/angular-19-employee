import { Component } from '@angular/core';
// Update the import path if necessary; for example:
import { EmployeeListComponent } from "../../components/employee-list/employee-list.component";

@Component({
  selector: 'app-dashboard',
  imports: [EmployeeListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
