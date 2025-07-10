import { Component, effect, inject } from '@angular/core';
import { PagesServicesService } from '../pages-services/pages-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-state-pages',
  templateUrl: './state-pages.component.html',
  styleUrls: ['./state-pages.component.css']
})
export class StatePagesComponent {

  private pageService = inject(PagesServicesService)

  public page : string = '';

  constructor(private router: Router) {
    effect(() => {
      if(this.pageService._statepages() === 'Tablero') {
        this.page = 'Tablero de Carros Automotrices';
      }else{
        this.page = 'Mantenimiento';
      }
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('page-gps')){
      this.page = localStorage.getItem('page-gps') === 'dashboard/maintenance' ? 'Mantenimiento' : 'Tablero de Carros Automotrices';
    }
  }
}
