import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { TableComponent } from './table/table.component';
import {MatTableModule} from '@angular/material/table';
import { ShowCurrentDayComponent } from './show-current-day/show-current-day.component';
import { PipePipe } from './pipe/pipe.pipe';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    BoardComponent,
    TableComponent,
    ShowCurrentDayComponent,
    PipePipe
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MatTableModule,
    MatDividerModule
  ]
})
export class BoardModule { }
