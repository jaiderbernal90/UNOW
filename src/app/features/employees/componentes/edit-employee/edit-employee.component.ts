import { TitleCasePipe } from '@angular/common';
import {
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeesService } from '@features/employees/services/employees.service';
import { UtilsService } from '@features/employees/services/utils.service';
import { PositionsService } from 'app/api/positions.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    TitleCasePipe,
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent implements OnInit {
  public readonly _utilsSvc = inject(UtilsService);
  private readonly _positionsSvc = inject(PositionsService);
  private readonly _employeesSvc = inject(EmployeesService);
  private readonly _fb = inject(FormBuilder);
  public positions = this._positionsSvc.positions;
  visible = this._utilsSvc.visible;
  dataEdit = this._utilsSvc.dataEdit;
  form!: FormGroup;

  public onSubmit() {
    if(this.form.valid){
      this._employeesSvc.editEmployee(
        this.form.value,
        this.dataEdit()?.index ?? 0
      );
      this._utilsSvc.setVisible(false);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this._fb.group({
      name: [
        this.dataEdit()?.employee?.name,
        [Validators.required, Validators.maxLength(100)],
      ],
      lastName: [this.dataEdit()?.employee?.lastName, [Validators.required]],
      jobTitle: [this.dataEdit()?.employee?.jobTitle, [Validators.required]],
    });
  }
}
