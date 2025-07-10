import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesServicesService {
  public _statepages = signal<string>('Tablero de Carros Automotrices');
  setStatepagesSignal(Page: string){
    this._statepages.set(Page);
  }

  getCurrentPage(): string {
    return this._statepages();
  }
}
