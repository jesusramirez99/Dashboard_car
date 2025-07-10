import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDashboardComponent } from './layout/layout-dashboard/layout-dashboard.component';
import { BoardComponent } from './pages/board/board.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDashboardComponent,
    children: [
      {
        path: 'board',
        component: BoardComponent,
      },
      {
        path: 'maintenance',
        component: MaintenanceComponent
      },
      {
        path: '**',
        redirectTo: 'board'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
