import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { EditEmployeeComponent } from './edit-employee.component';
import { EmployeesService } from '@features/employees/services/employees.service';
import { UtilsService } from '@features/employees/services/utils.service';
import { PositionsService } from 'app/api/positions.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

const mockEmployee = {
  index: 0,
  employee: {
    name: 'John',
    lastName: 'Doe',
    jobTitle: 'scrum master',
    dateOfBirth: '01/05/1990',
  },
};

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeComponent;
  let fixture: ComponentFixture<EditEmployeeComponent>;
  let employeesServiceSpy: jasmine.SpyObj<EmployeesService>;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;
  let positionsServiceSpy: jasmine.SpyObj<PositionsService>;

  beforeEach(waitForAsync(() => {
    const employeesSpy = jasmine.createSpyObj('EmployeesService', [
      'editEmployee',
    ]);
    const utilsSpy = jasmine.createSpyObj('UtilsService', [
      'setVisible',
      'visible',
      'dataEdit',
    ]);
    const positionsSpy = jasmine.createSpyObj('PositionsService', [
      'positions',
    ]);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        NoopAnimationsModule,
        EditEmployeeComponent,
        TitleCasePipe,
      ],
      providers: [
        { provide: EmployeesService, useValue: employeesSpy },
        { provide: UtilsService, useValue: utilsSpy },
        {
          provide: PositionsService,
          useValue: {
            positions: signal<string[]>([
              'full-stack developer',
              'scrum master',
            ]),
          },
        },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditEmployeeComponent);
    component = fixture.componentInstance;
    employeesServiceSpy = TestBed.inject(
      EmployeesService
    ) as jasmine.SpyObj<EmployeesService>;
    utilsServiceSpy = TestBed.inject(
      UtilsService
    ) as jasmine.SpyObj<UtilsService>;
    positionsServiceSpy = TestBed.inject(
      PositionsService
    ) as jasmine.SpyObj<PositionsService>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    utilsServiceSpy.dataEdit.and.returnValue(mockEmployee);
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.controls['name'].value).toBe('John');
    expect(component.form.controls['lastName'].value).toBe('Doe');
    expect(component.form.controls['jobTitle'].value).toBe('scrum master');
  });

  it('should call editEmployee and setVisible on submit', () => {
    utilsServiceSpy.dataEdit.and.returnValue(mockEmployee);
    component.ngOnInit();

    component.form.setValue({
      name: 'Jane',
      lastName: 'Smith',
      jobTitle: 'Designer',
    });

    component.onSubmit();

    expect(employeesServiceSpy.editEmployee).toHaveBeenCalledWith(
      {
        name: 'Jane',
        lastName: 'Smith',
        jobTitle: 'Designer',
      },
      0
    );
    expect(utilsServiceSpy.setVisible).toHaveBeenCalledWith(false);
  });

  it('should not call editEmployee if the form is invalid', () => {
    utilsServiceSpy.dataEdit.and.returnValue(mockEmployee);
    component.ngOnInit();

    component.form.setValue({
      name: '',
      lastName: '',
      jobTitle: '',
    });

    component.onSubmit();

    expect(employeesServiceSpy.editEmployee).not.toHaveBeenCalled();
    expect(utilsServiceSpy.setVisible).not.toHaveBeenCalled();
  });
});
