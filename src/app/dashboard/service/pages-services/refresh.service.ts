import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  constructor() { }

  public _RefreshTable = signal<boolean>(false);

  setRefreshTable(resp: boolean){
    this._RefreshTable.set(resp);
  }

  getRefreshTable(): boolean {
    return this._RefreshTable();
  }
}
