import { Injectable, inject, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeesService } from './employees.service';
import { IEmployeeEditForm } from '../interfaces/IEmployee.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly _messageSvc = inject(MessageService);
  private readonly _employeesSvc = inject(EmployeesService);
  private readonly _confirmationSvc = inject(ConfirmationService);
  public visible = signal<boolean>(false);
  public dataEdit = signal<IEmployeeEditForm>({});

  public setDataEdit(dataEdit: IEmployeeEditForm): void {
    return this.dataEdit.set(dataEdit);
  }

  public setVisible(visible: boolean): void {
    return this.visible.set(visible);
  }

  public showDialogDeleteEmployee(indexEmployee: number): ConfirmationService {
    return this._confirmationSvc.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this._employeesSvc.deleteEmployee(indexEmployee);
        this._messageSvc.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
        this._employeesSvc.getEmployees();
      },
    });
  }
}
