export interface DataDetails {
    data: DataTable[];
    fecha_Actual: Date;
}

export interface DataTable {
    tren:             string;
    origen:           string;
    distrito_calc:    string;
    fecha_llamado:    Date;
    fh_lectura:       Date;
    direccion:        string;
    tiempo_hrs:       number;
    fecha_tren:       Date;
    flag_demora:      string;
    salida_tarde:     string;
    ultima_ubicacion: string;
    ultima_lectura:   Date;
    created_date:     Date;
    tag_detenido:     string;
}

