export interface DataTable {
    status: Status;
    result: Result[];
}

export interface Result {
    notificaciones:  number;
    unidad:          string;
    estado:          string;
    geocerca:        number;
    numero_guia:     string;
    tren_lt:         string;
    fecha_lt:        Date;
    permanencia:     number;
    origen:          string;
    nombre_origen:   string;
    destino:         string;
    nombre_destino:  string;
    cliente:         string;
    nombre_geocerca: string;
    meta_hrs:        number;
}

export interface Status {
    Result:    string;
    ErrorCode: string;
    Message:   string;
}
