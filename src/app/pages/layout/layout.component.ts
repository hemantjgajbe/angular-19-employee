import { Component, inject } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [DashboardComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  router = inject(Router);

  onLogOff() {
    localStorage.removeItem('logData');
    this.router.navigateByUrl("/login");
  }
}
