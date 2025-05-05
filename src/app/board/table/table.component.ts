import { AfterViewInit, Component, inject } from '@angular/core';
import { RequestHttpService } from 'src/app/service/request-http.service';
import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { DataTable } from 'src/app/interface/dataTable.interface';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  
  private _serviceHttp = inject(RequestHttpService);
  dataSource!: MatTableDataSource<DataTable>;
  public dataTable: DataTable[] = [];
  public lastDate: Date = new Date();
  public minDate: Date = new Date(0); 

  ngOnInit(){
    this._serviceHttp.getTableData().subscribe({
      next: (data) => {
        this.lastDate = data.fecha_Actual;
        console.log(this.lastDate);
        for(let i = 0; i<data.data.length; i++){
            if(data.data[i].salida_tarde === '+2 Hrs ST' && data.data[i].flag_demora === '+16 Horas'){
                data.data[i].flag_demora = '+2 Hrs ST';
            }

            if(data.data[i].salida_tarde === '+2 Hrs ST' && data.data[i].flag_demora === '+10 Horas'){
              data.data[i].flag_demora = '+2 Hrs ST';
            }

            if(data.data[i].salida_tarde === '+2 Hrs ST' && data.data[i].flag_demora === '+12 Horas'){
              data.data[i].flag_demora = '+2 Hrs ST';
            }

            if(data.data[i].salida_tarde === '+2 Hrs ST' && data.data[i].flag_demora === null){
                data.data[i].flag_demora = '+2 Hrs ST';
            }

            if(data.data[i].salida_tarde === null && data.data[i].tag_detenido !== null){
              data.data[i].flag_demora = '';
            }
            this.dataTable = data.data;
        }
      },
      error: (message) => {
        Swal.fire({
          icon: "error",
          title: 'Lo sentimos, ha ocurrido un problema con el servidor',
          text: `${message}`,
        })
      }
    });
    setInterval(() => {
      this._serviceHttp.getTableData().subscribe((data) => {
        this.lastDate = data.fecha_Actual; 
        console.log(this.lastDate);
        for(let i = 0; i<data.data.length; i++){
          if(data.data[i].salida_tarde === '+2 Hrs ST' && data.data[i].flag_demora === '+16 Horas'){
              data.data[i].flag_demora = '+2 Hrs ST';
          }

          if(data.data[i].salida_tarde === '+2 Hrs ST' && data.data[i].flag_demora === '+10 Horas'){
            data.data[i].flag_demora = '+2 Hrs ST';
          }

          if(data.data[i].salida_tarde === '+2 Hrs ST' && data.data[i].flag_demora === '+12 Horas'){
            data.data[i].flag_demora = '+2 Hrs ST';
          }

          if(data.data[i].salida_tarde === '+2 Hrs ST' && data.data[i].flag_demora === null ){
              data.data[i].flag_demora = '+2 Hrs ST';
          }
          if(data.data[i].salida_tarde === null && data.data[i].tag_detenido !== null){
            data.data[i].flag_demora = '';
          }
          this.dataTable = data.data;
        }
    })
    },60000)
  }

  ngAfterViewInit(): void {
    
    this.dataSource.data = this.dataTable;
  }

  displayedColumns: string[] = ['train' ,'dateTrain' ,'dateCall', 'District', 'TrainDirection', 'initialStation', 'exitTrain', 'travelTime', 'lastLocation', 'lastRead', 'Delay', 'Detention'];
}
