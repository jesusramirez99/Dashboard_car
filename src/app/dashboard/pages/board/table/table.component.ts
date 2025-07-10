import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataTable, Result } from 'src/app/dashboard/interface/dataTable.interface';
import { RequestHttpService } from 'src/app/dashboard/service/request-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  private _serviceHttp = inject(RequestHttpService);
  dataSource!: MatTableDataSource<DataTable>;
  public dataTable: Result[] = [];
  public lastDate: Date = new Date();
  public minDate: Date = new Date(0); 

  ngOnInit(){
    this._serviceHttp.getTableData().subscribe({
      next: (data) => {
        this.dataTable = data;
        console.log(this.dataTable);
      },
      error: (message) => {
        Swal.fire({
          icon: "error",
          title: 'Lo sentimos, ha ocurrido un problema con el servidor',
          text: `${message}`,
        })
      }
    });
    
  }

  /*ngAfterViewInit(): void {
    this.dataSource.data = this.dataTable;
  }*/

  displayedColumns: string[] = ['idCar' ,'Customer' ,'Origin', 'Destination', 'LastLocation', 'DateLastLocation', 'PlannedTime', 'RealTime'];
}
