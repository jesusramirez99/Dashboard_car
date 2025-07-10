export interface DataMaintenance {
    status: Status;
    result: Result[];
}

export interface Result {
    Uid:                string;
    Name:               string;
    IMEI:               string;
    Status:             string;
    GroupName:          string;
    CompanyName:        string;
    PhoneNumber:        string;
    CreatedDateTimeUtc: Date;
}

export interface Status {
    Result:    string;
    ErrorCode: string;
    Message:   string;
}
