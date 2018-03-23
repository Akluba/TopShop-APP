export class RequirementField {
    id: number;
    title: string;
    type: string;
}

export class Requirement {
    id: number;
    field_id: number;
    condition: string;
    value: string | any[];
}
