import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { EmployeesService } from '@features/employees/services/employees.service';
import { CardComponent } from '@shared/components/card/card.component';
import {
  ConfirmationService,
  MenuItem,
  Message,
  MessageService,
} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Table, TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { UtilsService } from '@features/employees/services/utils.service';
import { IEmployee } from '@features/employees/interfaces/IEmployee.interface';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [
    CardComponent,
    MenuModule,
    ButtonModule,
    TableModule,
    TitleCasePipe,
    FormsModule,
    DatePipe,
    ConfirmDialogModule,
    ToastModule,
    EditEmployeeComponent,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MessagesModule
  ],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss',
  providers: [ConfirmationService, MessageService, UtilsService],
})
export class ListEmployeesComponent implements OnInit {
  private readonly _employeesSvc = inject(EmployeesService);
  public readonly _utilsSvc = inject(UtilsService);
  public employees = this._employeesSvc.employees;
  public items: MenuItem[] | undefined;
  public first = 0;
  public rows = 10;
  public searchValue = '';
  public messages: Message[] = [
    {
      severity: 'secondary',
      detail: 'You do not have any registered employees yet.  ',
    },
  ];

  ngOnInit() {
    this.initItems();
    this._employeesSvc.getEmployees();
  }

  // ------------------------------------------
  // ACTIONS TABLE
  // ------------------------------------------
  public clear(table: Table): void {
    table.clear();
    this.searchValue = '';
  }

  public pageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  // ------------------------------------------
  // ACTIONS DELETE AND EDIT
  // ------------------------------------------
  confirmDelete(index: number) {
    this._utilsSvc.showDialogDeleteEmployee(index);
  }

  handleClickDialogEdit(index: number, employee: IEmployee) {
    this._utilsSvc.setVisible(true);
    this._utilsSvc.setDataEdit({ index, employee });
  }

  handleClickItem(item: MenuItem, employee: IEmployee, index: number) {
    if (item.label?.includes('name'))
      return this.handleClickDialogEdit(index, employee);
    return this.confirmDelete(index);
  }

  public initItems() {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Edit name',
            icon: 'pi pi-user-edit',
          },
          {
            label: 'Unsubscribe',
            icon: 'pi pi-user-minus',
          },
        ],
      },
    ];
  }
}
