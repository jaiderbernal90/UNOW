import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee.component';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeesService } from '@features/employees/services/employees.service';
import { PositionsService } from 'app/api/positions.service';
import { CardComponent } from '@shared/components/card/card.component';
import { signal } from '@angular/core';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  let employeesServiceSpy: jasmine.SpyObj<EmployeesService>;
  let positionsServiceSpy: jasmine.SpyObj<PositionsService>;

  beforeEach(waitForAsync(() => {
    const employeesSpy = jasmine.createSpyObj('EmployeesService', ['setEmployee', 'getEmployees']);
    const positionsSpy = jasmine.createSpyObj('PositionsService', ['positions']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        CalendarModule,
        FormsModule,
        NoopAnimationsModule,
        AddEmployeeComponent,
        CardComponent,
      ],
      providers: [
        { provide: EmployeesService, useValue: employeesSpy },
        {
          provide: PositionsService,
          useValue: {
            positions: signal<string[]>(['full-stack developer', 'scrum master'])
          }
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    employeesServiceSpy = TestBed.inject(EmployeesService) as jasmine.SpyObj<EmployeesService>;
    positionsServiceSpy = TestBed.inject(PositionsService) as jasmine.SpyObj<PositionsService>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.controls['name']).toBeDefined();
    expect(component.form.controls['lastName']).toBeDefined();
    expect(component.form.controls['jobTitle']).toBeDefined();
    expect(component.form.controls['dateOfBirth']).toBeDefined();
  });

  it('should submit the form and call setEmployee', () => {
    component.ngOnInit();
    component.form.setValue({
      name: 'John',
      lastName: 'Doe',
      jobTitle: 'Developer',
      dateOfBirth: '01/01/1990'
    });

    component.handleOnSubmit();

    expect(employeesServiceSpy.setEmployee).toHaveBeenCalledWith({
      name: 'John',
      lastName: 'Doe',
      jobTitle: 'Developer',
      dateOfBirth: '01/01/1990'
    });
    expect(employeesServiceSpy.getEmployees).toHaveBeenCalled();
    expect(component.form.value).toEqual({
      name: null,
      lastName: null,
      jobTitle: null,
      dateOfBirth: null
    });
  });

  it('should not submit the form if it is invalid', () => {
    component.ngOnInit();
    component.form.setValue({
      name: '',
      lastName: '',
      jobTitle: '',
      dateOfBirth: ''
    });

    component.handleOnSubmit();

    expect(employeesServiceSpy.setEmployee).not.toHaveBeenCalled();
    expect(employeesServiceSpy.getEmployees).not.toHaveBeenCalled();
  });

  it('should disable the submit button if the form is invalid', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');

    expect(submitButton.disabled).toBeTrue();

    component.form.setValue({
      name: 'John',
      lastName: 'Doe',
      jobTitle: 'Developer',
      dateOfBirth: '01/01/1990'
    });

    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalse();
  });
});
