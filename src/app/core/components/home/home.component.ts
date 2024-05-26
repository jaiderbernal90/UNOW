import { Component } from '@angular/core';
import { AddEmployeeComponent } from '@features/employees/componentes/add-employee/add-employee.component';
import { ListEmployeesComponent } from '@features/employees/componentes/list-employees/list-employees.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AddEmployeeComponent,
    ListEmployeesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
