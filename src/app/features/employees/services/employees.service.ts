import { Injectable, inject, signal } from '@angular/core';
import { IEmployee } from '../interfaces/IEmployee.interface';
import { CookiesService } from '@shared/services/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly _cookiesSvc = inject(CookiesService);
  public employees = signal<IEmployee[]>([]);

  public getEmployees(): void {
    let listEmployee = (this._cookiesSvc.get('listEmployee') ?? [{}]) as string;
    if (listEmployee)
      this.employees.set((JSON.parse(listEmployee) as IEmployee[]));
  }

  public setEmployee(newEmployee: IEmployee): void {
    const updatedEmployees = [newEmployee, ...this.employees()];
    this.employees.set(updatedEmployees);
    this.saveEmployeesToCookies();
  }

  public deleteEmployee(index: number): void {
    if (this.isValidIndex(index)) {
      this.removeEmployeeAtIndex(index);
      this.saveEmployeesToCookies();
    } else {
      console.error('Invalid index: ', index);
    }
  }

  private removeEmployeeAtIndex(index: number): void {
    const currentEmployees = this.employees();
    const updatedEmployees = currentEmployees.filter((_, i) => i !== index);
    this.employees.set(updatedEmployees);
  }

  public editEmployee(updatedEmployee: IEmployee, index: number): void {
    this.updateEmployeeDetails(updatedEmployee, index);
  }

  private updateEmployeeDetails(
    updatedEmployee: IEmployee,
    index: number
  ): void {
    if (this.isValidIndex(index)) {
      const employee = this.employees();
      const employeeEdited = employee[index];
      if(updatedEmployee?.name) employeeEdited.name = updatedEmployee?.name;
      if(updatedEmployee?.jobTitle) employeeEdited.jobTitle = updatedEmployee?.jobTitle;
      if(updatedEmployee?.lastName) employeeEdited.lastName = updatedEmployee?.lastName;
      employee[index] = employeeEdited;
      this.saveEmployeesToCookies(employee);
    }
  }

  private saveEmployeesToCookies(employee?: IEmployee[]): void {
    const employeesJson = JSON.stringify(employee ?? this.employees());
    this._cookiesSvc.set('listEmployee', employeesJson)
  }

  private isValidIndex(index: number): boolean {
    return index <= this.employees.length;
  }
}
