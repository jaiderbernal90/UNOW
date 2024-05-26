import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { IEmployee } from '../interfaces/IEmployee.interface';

@Injectable()
export class MockEmployeesService {
  public employees = signal<IEmployee[]>([
    {
      name: 'John',
      lastName: 'Doe',
      jobTitle: 'Developer',
      dateOfBirth: new Date('1990-01-01').toLocaleDateString(),
    },
    {
      name: 'Jane',
      lastName: 'Smith',
      jobTitle: 'Manager',
      dateOfBirth: new Date('1985-05-15').toLocaleDateString(),
    },
  ]);

  setEmployee(newEmployee: any): void {
    const prevEmployees = this.employees();
    this.employees.set([...prevEmployees, newEmployee]);
  }
  getEmployees(): void {}
  deleteEmployee(index: number) {}
}
