import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MockEmployeesService } from './employees.service.mock';
import { EmployeesService } from './employees.service';

class MockMessageService {
  add() {}
}

class MockConfirmationService {
  confirm() {
    return {
      accept: () => {},
      reject: () => {},
    };
  }
}

describe('UtilsService', () => {
  let service: UtilsService;
  let messageService: MessageService;
  let confirmationService: ConfirmationService;
  let employeesService: MockEmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilsService,
        { provide: MessageService, useClass: MockMessageService },
        { provide: ConfirmationService, useClass: MockConfirmationService },
        { provide: EmployeesService, useClass: MockEmployeesService },
      ],
    });

    service = TestBed.inject(UtilsService);
    messageService = TestBed.inject(MessageService);
    confirmationService = TestBed.inject(ConfirmationService);
    employeesService = TestBed.inject(EmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set dataEdit', () => {
    const mockData = { index: 0, employee: { name: 'John', jobTitle: 'Developer', lastName: 'Doe' } };
    service.setDataEdit(mockData);
    expect(service.dataEdit()).toEqual(mockData);
  });

  it('should set visible', () => {
    service.setVisible(true);
    expect(service.visible()).toBe(true);
  });

});
