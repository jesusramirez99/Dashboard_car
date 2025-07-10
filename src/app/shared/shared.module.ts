import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCurrentDayComponent } from './show-current-day/show-current-day.component';



@NgModule({
  declarations: [
    ShowCurrentDayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowCurrentDayComponent
  ],
})
export class SharedModule { }
