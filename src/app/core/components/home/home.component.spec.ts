import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { AddEmployeeComponent } from '@features/employees/componentes/add-employee/add-employee.component';
import { ListEmployeesComponent } from '@features/employees/componentes/list-employees/list-employees.component';
import { MockComponent } from 'ng-mocks';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockComponent(AddEmployeeComponent),
        MockComponent(ListEmployeesComponent)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render add-employee component', () => {
    const addEmployeeElement = fixture.debugElement.query(By.directive(AddEmployeeComponent));
    expect(addEmployeeElement).toBeTruthy();
  });

  it('should render list-employees component', () => {
    const listEmployeesElement = fixture.debugElement.query(By.directive(ListEmployeesComponent));
    expect(listEmployeesElement).toBeTruthy();
  });
});
