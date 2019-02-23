export class Option {
    id: number;
    isAnswer: boolean;
    value: string;
    optionType: number;
    constructor(id: number, value: string, optionType: number) {
        this.id = id;
        this.value = value;
        this.optionType = optionType;
    }
}