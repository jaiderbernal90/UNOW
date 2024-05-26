import { TestBed } from '@angular/core/testing';
import { EmployeesService } from './employees.service';
import { CookiesService } from '@shared/services/cookie.service';
import { IEmployee } from '../interfaces/IEmployee.interface';

const mockEmployees = [
  {
    name: 'John',
    jobTitle: 'front-end developer',
    lastName: 'Doe',
    dateOfBirth: new Date().toLocaleDateString(),
  },
  {
    name: 'Pepito',
    jobTitle: 'full-stack developer',
    lastName: 'Perez',
    dateOfBirth: new Date().toLocaleDateString(),
  },
  {
    name: 'Bob',
    jobTitle: 'sw admin',
    lastName: 'Johnson',
    dateOfBirth: new Date().toLocaleDateString(),
  },
  {
    name: 'Bob',
    jobTitle: 'scrum master',
    lastName: 'Martin',
    dateOfBirth: new Date().toLocaleDateString(),
  },
];

const updatedEmployee = {
  name: 'Juan',
  jobTitle: 'full-stack developer',
  lastName: 'Doe',
  dateOfBirth: new Date().toLocaleDateString(),
};

const newEmployee = {
  name: 'Jhon 2',
  jobTitle: 'sw admin',
  lastName: 'Johnson',
  dateOfBirth: new Date().toLocaleDateString(),
};

describe('EmployeesService', () => {
  let service: EmployeesService;
  let cookiesServiceSpy: jasmine.SpyObj<CookiesService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CookiesService', ['get', 'set']);

    TestBed.configureTestingModule({
      providers: [
        EmployeesService,
        { provide: CookiesService, useValue: spy }
      ]
    });

    service = TestBed.inject(EmployeesService);
    cookiesServiceSpy = TestBed.inject(CookiesService) as jasmine.SpyObj<CookiesService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get employees from cookies', () => {
    cookiesServiceSpy.get.and.returnValue(JSON.stringify(mockEmployees));

    service.getEmployees();

    expect(service.employees()).toEqual(mockEmployees);
  });

  it('should set a new employee at the beginning', () => {
    service.employees.set(mockEmployees);
    service.setEmployee(newEmployee);

    expect(service.employees()).toEqual([newEmployee, ...mockEmployees]);
    expect(cookiesServiceSpy.set).toHaveBeenCalled();
  });

  it('should delete an employee by index', () => {
    const initialEmployees: IEmployee[] = [
      { name: 'John', jobTitle: 'Developer', lastName: 'Doe', dateOfBirth: '01/05/1995' },
      { name: 'Jane', jobTitle: 'full-stack', lastName: 'Smith', dateOfBirth: '01/05/1995' }
    ];
    service.employees.set(initialEmployees);

    service.deleteEmployee(0);

    expect(service.employees()).toEqual([{ name: 'Jane', jobTitle: 'full-stack', lastName: 'Smith', dateOfBirth: '01/05/1995' }]);
    expect(cookiesServiceSpy.set).toHaveBeenCalled();
  });

  it('should not delete an employee if index is invalid', () => {
    service.employees.set(mockEmployees);

    service.deleteEmployee(10);

    expect(service.employees()).toEqual(mockEmployees);
    expect(cookiesServiceSpy.set).not.toHaveBeenCalled();
  });

  it('should edit an employee by index', () => {
    service.employees.set(mockEmployees);
    service.editEmployee(updatedEmployee, 0);

    expect(service.employees()[0].jobTitle).toBe('full-stack developer');
    expect(cookiesServiceSpy.set).toHaveBeenCalled();
  });

  it('should not edit an employee if index is invalid', () => {
    const initialEmployees: IEmployee[] = [
      { name: 'John', jobTitle: 'Developer', lastName: 'Doe' }
    ];
    service.employees.set(initialEmployees);

    const updatedEmployee: IEmployee = { name: 'John', jobTitle: 'Senior Developer', lastName: 'Doe' };

    // Llama al método con un índice inválido
    service.editEmployee(updatedEmployee, 10);

    // Verifica que la lista de empleados no ha cambiado
    expect(service.employees()).toEqual(initialEmployees);

    // Verifica que el método set de CookiesService no fue llamado
    expect(cookiesServiceSpy.set).not.toHaveBeenCalled();
  });
});
