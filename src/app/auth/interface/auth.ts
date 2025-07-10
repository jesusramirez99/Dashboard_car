export interface LoignResponse {
    status: Status;
    result: Result;
}

export interface Result {
    numemp_pk:          number;
    nombre_usuario:     string;
    nivel_usuario:      number;
    activo:             number;
    fecha_alta:         null;
    fecha_modificacion: null;
    password:           null;
}

export interface Status {
    Result:    string;
    ErrorCode: string;
    Message:   string;
}
