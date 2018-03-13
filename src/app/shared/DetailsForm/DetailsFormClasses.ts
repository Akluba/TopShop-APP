export class LogEntry {
    id = 0;
    source_class: string;
    source_id: number;
    field_id: number;
    log_field1: string = null;
    log_field2: string = null;
    log_field3: string = null;
    log_field4: string = null;
    log_field5: string = null;
    log_field6: string = null;
    log_field7: string = null;
    log_field8: string = null;
    log_field9: string = null;
    log_field10: string = null;

    constructor(source_class, source_id, field_id, log_field1?, log_field2?) {
        this.source_class = source_class;
        this.source_id    = source_id;
        this.field_id     = field_id;
        this.log_field1   = log_field1;
        this.log_field2   = log_field2;
    }
}