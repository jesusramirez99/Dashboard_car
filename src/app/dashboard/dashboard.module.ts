import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutDashboardComponent } from './layout/layout-dashboard/layout-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BoardComponent } from './pages/board/board.component';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { TableComponent } from './pages/board/table/table.component';
import { TableMaintenanceComponent } from './pages/maintenance/table-maintenance/table-maintenance.component';
import { StatePagesComponent } from './service/state-pages/state-pages.component';
import { AssignGPSComponent } from './pages/maintenance/assign-gps/assign-gps.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutDashboardComponent,
    BoardComponent,
    MaintenanceComponent,
    TableComponent,
    TableMaintenanceComponent,
    StatePagesComponent,
    AssignGPSComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
