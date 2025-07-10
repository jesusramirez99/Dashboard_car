import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { pages } from '../../interface/dashboard.interface';
import { PagesServicesService } from '../../service/pages-services/pages-services.service';

@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  styleUrls: ['./layout-dashboard.component.css']
})
export class LayoutDashboardComponent {
  private router = inject(Router)
  private PagesService = inject(PagesServicesService)
  public confiButtons: pages[] = [];

  ngOnInit(): void {
      const userLevel = localStorage.getItem('userlevel-gps');
      this.confiButtons = this.getButtonsLevel(userLevel);
  }

  getButtonsLevel(level: string | null): pages[] {
    switch (level) {
      case '1':
        return [
          { nombre: "Tablero", url: "board", icon: "home" },
          { nombre: "Mantenimiento", url: "maintenance", icon: "settings" },
        ];
      case '2': 
        return [
          { nombre: "Tablero", url: "board", icon: "home" },
        ];
      default: 
        return [];
    }
  }

  cambiarPagina(url: string){
    const page: string = this.confiButtons.find(conf => conf.url === url)!.nombre
    this.PagesService.setStatepagesSignal(page);
    localStorage.setItem('page-gps', `dashboard/${url}`)
    this.router.navigateByUrl(`dashboard/${url}`)
  }

  logout(){
    localStorage.removeItem('username-gps');
    localStorage.removeItem('page-gps');
    this.router.navigateByUrl('login');
    
  }
}
