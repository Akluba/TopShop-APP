export class RequirementField {
    id: number;
    title: string;
    type: string;
}

export class Requirement {

    id: number;
    company_id: number;
    field_id: number;
    condition: string;
    value: string | any[];

    constructor(id, company, field?, condition?, value?) {
        this.id = id;
        this.company_id = company;
        this.field_id = field;
        this.condition = condition;
        this.value = value;
    }
}
