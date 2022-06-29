export class Column {
    field: string;
    header: string;
    type: string;
    editable: boolean;
    constructor(field, header, type, editable) {
        this.field = field;
        this.header = header;
        this.type = type;
        this.editable = editable;
    }
}

export class SetupElement {
    id = 0;
    title: string = null;
    sort_order: number;
    source_class?: string;
    source_id?: number;
    category_id?: number;
    field_id?: number;
    type?: string;

    constructor(sort_order, source_class?, source_id?, category_id?, field_id?, type?) {
        this.sort_order   = sort_order;
        this.source_class = source_class;
        this.source_id    = source_id;
        this.category_id  = category_id;
        this.field_id     = field_id;
        this.type         = type;
    }
}
