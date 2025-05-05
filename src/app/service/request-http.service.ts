import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroments } from 'src/enviroments/enviroments';
import { DataTable, DataDetails } from 'src/app/interface/dataTable.interface';

@Injectable({
  providedIn: 'root'
})

export class RequestHttpService {
  private baseUrl = enviroments.api;
  private http = inject(HttpClient);
  
  constructor() { }

  getTableData(): Observable<{data: DataTable[], fecha_Actual: Date}>{
    const url = `${this.baseUrl}/api/TableroTrenes/infoTrenes`;
    return this.http.get<DataDetails>(url).pipe(
      map( resp => ({ 
        data: resp.data.filter(datos => datos.salida_tarde !== null || datos.tag_detenido !== null)
        .sort((a, b) => {
          return a.tiempo_hrs - b.tiempo_hrs;
        }),
        fecha_Actual: resp.fecha_Actual
      })),
      catchError((err) => {
        return throwError (() => 'Ha ocurrido un problema para mostrar la informacion');
      })
    );
  }

}