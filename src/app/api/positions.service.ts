import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@envs/environment';
import { IResponsePosition } from '@shared/interfaces/IPositions.interface';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PositionsService {
  public positions = signal<string[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiURL;

  constructor() {
    this.getPositions();
  }

  public getPositions(): void {
    this._http
      .get<IResponsePosition>(`${this._endPoint}/positions`)
      .pipe(
        tap((data: IResponsePosition) => this.positions.set(data.positions))
      )
      .subscribe();
  }
}
