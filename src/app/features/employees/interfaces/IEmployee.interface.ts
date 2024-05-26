import { FormControl } from "@angular/forms";

export interface IEmployee {
  name?: string | null | undefined;
  lastName?: string | null | undefined;
  jobTitle?: string | null | undefined;
  dateOfBirth?: string | null | undefined;
}

export interface IEmployeeForm{
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  jobTitle: FormControl<string | null>;
  dateOfBirth: FormControl<string | null>;
}

export interface IEmployeeEditForm{
  index?: number;
  employee?: IEmployee;
}

