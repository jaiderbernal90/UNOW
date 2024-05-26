import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ListEmployeesComponent } from './list-employees.component';
import { EmployeesService } from '@features/employees/services/employees.service';
import { UtilsService } from '@features/employees/services/utils.service';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { signal } from '@angular/core';

describe('ListEmployeesComponent', () => {
  let component: ListEmployeesComponent;
  let fixture: ComponentFixture<ListEmployeesComponent>;
  let employeesServiceSpy: jasmine.SpyObj<EmployeesService>;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;

  beforeEach(waitForAsync(() => {
    const employeesSpy = jasmine.createSpyObj('EmployeesService', ['getEmployees'], {
      employees: signal([
        { name: 'John', lastName: 'Doe', jobTitle: 'Developer', dateOfBirth: '1990-01-01' }
      ])
    });

    const utilsSpy = jasmine.createSpyObj('UtilsService', ['visible', 'showDialogDeleteEmployee', 'setVisible', 'setDataEdit'], {
      visible: signal(false)
    });

    TestBed.configureTestingModule({
      imports: [
        MenuModule,
        ButtonModule,
        TableModule,
        FormsModule,
        ConfirmDialogModule,
        ToastModule,
        NoopAnimationsModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        MessagesModule,
        TitleCasePipe,
        DatePipe,
        EditEmployeeComponent,
        ListEmployeesComponent
      ],
      providers: [
        { provide: EmployeesService, useValue: employeesSpy },
        { provide: UtilsService, useValue: utilsSpy },
        ConfirmationService,
        MessageService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListEmployeesComponent);
    component = fixture.componentInstance;
    employeesServiceSpy = TestBed.inject(EmployeesService) as jasmine.SpyObj<EmployeesService>;
    utilsServiceSpy = TestBed.inject(UtilsService) as jasmine.SpyObj<UtilsService>;
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and fetch employees on ngOnInit', () => {
    component.ngOnInit();
    expect(employeesServiceSpy.getEmployees).toHaveBeenCalled();
    expect(component.employees().length).toBeGreaterThan(0);
  });

  it('should filter employees based on search input', () => {
    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector('p-table');
    const searchInput = table.querySelector('input[type="text"]');

    searchInput.value = 'John';
    searchInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.searchValue).toBe('John');
  });
});
