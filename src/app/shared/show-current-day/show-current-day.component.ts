import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-current-day',
  templateUrl: './show-current-day.component.html',
  styleUrls: ['./show-current-day.component.css']
})
export class ShowCurrentDayComponent implements OnInit, OnDestroy {
  currentDate = new Date();
  private intervalId: any;

  constructor() {
    this.updateCurrentDate();
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.updateCurrentDate(); 
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private updateCurrentDate(): void {
    this.currentDate = new Date();
  }
}
