import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroments } from 'src/enviroments/enviroments';
import { DataTable, Result } from '../interface/dataTable.interface';
import { DataMaintenance, Result as ResultMaintenance } from '../interface/data-maintenance.interface';
import { Gps, Message, SaveInformationAssigned } from '../interface/gps.interface';

@Injectable({
  providedIn: 'root'
})

export class RequestHttpService {
  private baseUrl = enviroments.api;
  private port = ':8383';
  private http = inject(HttpClient);
  
  constructor() { }

  getTableData(): Observable<Result[]> {
    const url = `${this.baseUrl}${this.port}/api/traerdatos`;
    return this.http.get<DataTable>(url).pipe(
      map(response => {
        if (response.status.Result !== 'ok') {
          throw new Error(`Error al obtener los datos`);
        }
        return response.result; // Devuelve solo los datos cuando hay éxito
      }),
      catchError(error => {
        return throwError(() => new Error('No se pudieron obtener los datos'));
      })
    );
  }

  getMaintenanceData(): Observable<{available: ResultMaintenance[]; assigned: ResultMaintenance[]}> {
    const url = `${this.baseUrl}${this.port}/api/unidadesvua`;
    return this.http.get<DataMaintenance>(url).pipe(
      map(response => {
        if (response.status.Result !== 'ok') {
          throw new Error(`Error al obtener los datos`);
        }
        return {
          available: response.result.filter(item => item.Name === item.IMEI),
          assigned: response.result.filter(item => item.Name !== item.IMEI)
        };
      }),
      catchError(error => {
        return throwError(() => new Error('No se pudieron obtener los datos'));
      })
    );
  }

  postAssign(data: Gps): Observable<Message>{
    const url = `${this.baseUrl}${this.port}/api/asignar`;
    return this.http.post<SaveInformationAssigned>(url, data).pipe(
      map((resp) => resp.Message),
      catchError((err) => {
        console.log(err.error.status.Message);
        return throwError(
          () => 'Error al elimin'
        );
      })
    )
  }


}