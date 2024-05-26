import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  private readonly _cookieSvc = inject(CookieService);

  public get(key: string): string {
    return this._cookieSvc.get(key);
  }

  public set(key: string, employeesJson: string): void {
    this._cookieSvc.set(key, employeesJson);
  }
}
