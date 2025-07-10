export interface Gps {
    Name:            string;
    Old_name:        string;
    Uid:             string;
    IMEI:            string;
    Num_empleado:    number;
    Informacion:     string;
    Old_informacion: string;
    Asignacion:      number;
}

export interface SaveInformationAssigned{
    Message: Message
}

export interface Message {
    status: Status;
    result: null;
}

export interface Status {
    Result:    string;
    ErrorCode: string;
    Message:   string;
}

