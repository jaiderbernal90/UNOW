import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from '@shared/components/card/card.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { PositionsService } from 'app/api/positions.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IEmployeeForm } from '@features/employees/interfaces/IEmployee.interface';
import { CalendarModule } from 'primeng/calendar';
import { EmployeesService } from '@features/employees/services/employees.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    CalendarModule,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
  private readonly _positionsSvc = inject(PositionsService);
  private readonly _employeesSvc = inject(EmployeesService);
  public positions = this._positionsSvc.positions;
  public selectedPosition!: string;
  public form!: FormGroup<IEmployeeForm>;
  public loading: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }

  handleOnSubmit(): void {
    if(this.form.valid){
      this._employeesSvc.setEmployee(this.form.value);
      this._employeesSvc.getEmployees();
      this.form.reset();
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      name: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      lastName: new FormControl<string>('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      jobTitle: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      dateOfBirth: new FormControl<string>('', {
        validators: [Validators.required],
      }),
    });
  }
}
