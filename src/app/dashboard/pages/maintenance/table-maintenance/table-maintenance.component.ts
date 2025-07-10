import { Component, effect, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Result } from 'src/app/dashboard/interface/data-maintenance.interface';
import { RefreshService } from 'src/app/dashboard/service/pages-services/refresh.service';
import { RequestHttpService } from 'src/app/dashboard/service/request-http.service';
import Swal from 'sweetalert2';


export interface Dispositivo {
  IMEI: string;
  Uid: string;
  Name: string;
}

@Component({
  selector: 'app-table-maintenance',
  templateUrl: './table-maintenance.component.html',
  styleUrls: ['./table-maintenance.component.css']
})
export class TableMaintenanceComponent implements OnInit {
  private _serviceHttp = inject(RequestHttpService);
  public like: string = '86225506';
  //dataSource!: MatTableDataSource<Result>;
  public dataSource: MatTableDataSource<Result> = new MatTableDataSource<Result>();
  public dataSource2: MatTableDataSource<Result> = new MatTableDataSource<Result>();
  public available: Result[] = [];
  public assigned: Result[] = [];
  public _Refesh = inject(RefreshService);
  openedModal = false;
  name: string = '';
  element: any;

  constructor(){


    effect(() => {
      const refresTables = this._Refesh.getRefreshTable();
      if(refresTables){
          this._serviceHttp.getMaintenanceData().subscribe({
          next: ({available, assigned}) => {
            this.available = available;
            this.assigned = assigned;
            this.dataSource.data = available;
            this.dataSource2.data = assigned;

            //console.log('disponibles', this.available);
            //console.log('asignadas', this.assigned);
          },
          error: (message) => {
            Swal.fire({
              icon: "error",
              title: 'Lo sentimos, ha ocurrido un problema con el servidor',
              text: `${message}`,
            });
          }
        });
        this._Refesh.setRefreshTable(false);
      }
    },{allowSignalWrites: true});
  }

  ngOnInit() {
    this._serviceHttp.getMaintenanceData().subscribe({
      next: ({available, assigned}) => {
        this.available = available;
        this.assigned = assigned;
        this.dataSource.data = available;
        this.dataSource2.data = assigned;

        //console.log('disponibles', this.available);
        //console.log('asignadas', this.assigned);
      },
      error: (message) => {
        Swal.fire({
          icon: "error",
          title: 'Lo sentimos, ha ocurrido un problema con el servidor',
          text: `${message}`,
        });
      }
    });
  }
  displayedColumns: string[] = ['IMEI', 'Uid', 'Name'];

  applyFilterAvailable(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    const value = filterValue;
    console.log(filterValue);
    this.dataSource.data = this.available.filter(item => 
      item.IMEI.toLowerCase().includes(value)
    );
  }

  applyFilterAssigned(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    const value = filterValue;
    this.dataSource2.data = this.assigned.filter(item => 
      item.IMEI.toLowerCase().includes(value)
    )
  }

  showInformationAvailable(uid: string){
     const result = this.available.filter(item => item.Uid === uid);
     const detalles = result.map(item => {
      const dateFormat = new Date(item.CreatedDateTimeUtc).toLocaleString("es-ES",{
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
      }); 
      return `<span style="color: var(--clr-light); font-size: 23px;">UID: ${uid} <br><br> ESTATUS: ${item.Status} <br><br> GRUPO: ${item.GroupName} <br><br> COMPAÑIA: ${item.CompanyName} <br><br> FECHA ALTA: ${dateFormat}</span>`;}).join('<br><br>');
      Swal.fire({
        icon: 'info',
        title: 'Detalles',
        html: detalles,
        background: 'var(--clr-dark)',      
        color: 'var(--clr-light)',  
      });
  }

  showInformationAsiggned(uid: string){
     const result = this.assigned.filter(item => item.Uid === uid);
     const detalles = result.map(item => {
      const dateFormat = new Date(item.CreatedDateTimeUtc).toLocaleString("es-ES",{
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
      }); 
      return `<span style="color: var(--clr-light); font-size: 23px;">UID: ${uid} <br><br> ESTATUS: ${item.Status} <br><br> GRUPO: ${item.GroupName} <br><br> COMPAÑIA: ${item.CompanyName} <br><br> FECHA ALTA: ${dateFormat}</span>`;}).join('<br><br>');
      Swal.fire({
        icon: 'info',
        title: 'Detalles',
        html: detalles,
        background: 'var(--clr-darlight)',
        color: 'var(--clr-light)',
      });
  }

  openModal(data: Result) {
    this.element = data;
    this.openedModal = true;
  }

  closeModal(){
    this.openedModal = false;
  }

  guardarNombre(nombre: string) {
    this.name = nombre;
    const dataGps = { 
          Name: this.name,
          Old_name: this.element.Name,
          Uid: this.element.Uid,
          IMEI: this.element.IMEI,
          Num_empleado: 31229,
          Informacion: '',
          Old_informacion: '',
          Asignacion: 0
    };

    //console.log(dataGps);
    

    this._serviceHttp.postAssign(dataGps).subscribe({
          next:() =>{
            this._Refesh.setRefreshTable(true);
            this.openedModal = false;
            Swal.fire({
              title: "¡Asignación exitosa!",
              icon: "success",
            })
            
          },
            error:(message) => {
                Swal.fire({
                title: "Lo sentimos, hubo un error al realizar la asignación ",
                icon: "error",
            });
          }
    });

  }
  
  //Funcion para desasignar
  Deallocate(data: Result) {
    Swal.fire({
      title: '¿Desea eliminar la asignacion?',
      icon: 'warning',
      confirmButtonColor: "#52b241",
      cancelButtonColor: "#d33",
      background: 'var(--clr-dark)',      
      showCancelButton: true,
      confirmButtonText: 'ACEPTAR',
      padding: '2px',
      cancelButtonText: 'CANCELAR',
      color: 'var(--clr-light)',

    }).then((result) => {
      if(result.isConfirmed){
        const dataGps = { 
          Name: data.IMEI,
          Old_name: data.Name,
          Uid: data.Uid,
          IMEI: data.IMEI,
          Num_empleado: 31229,
          Informacion: '',
          Old_informacion: '',
          Asignacion: 1
        };
      
        console.log('Desagignado:',dataGps);
        
        this._serviceHttp.postAssign(dataGps).subscribe({
          next:() =>{
            this._Refesh.setRefreshTable(true);
            Swal.fire({
              title: "¡Desasignación exitosa!",
              icon: "success",
            })
          },
            error:(message) => {
                Swal.fire({
                title: "Lo sentimos, hubo un error al eliminar la asignacion",
                icon: "error",
            });
          }
        });
      }
    });
  }
}
