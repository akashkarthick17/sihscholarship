import { FieldOption } from './field-option';

export class FilterField {
    fieldName: string;
    fieldOptions: Array<FieldOption>;

    constructor(fieldName: string, fieldOptions: FieldOption[]) {
        this.fieldName = fieldName;
        this.fieldOptions = fieldOptions;
    }
}
