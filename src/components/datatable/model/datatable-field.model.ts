/**
 * Interface du champ du composant
 */
export class DatatableField {
    label:string;
    value:string;
    sort:string;
    callback:Function;

    constructor(label:string, value:string, callback?:Function) {
        this.label = label;
        this.value = value;
        this.callback = callback;
    }
}