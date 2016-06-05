import { DatatableField } from "./datatable-field.model";
/**
 * Interface des informations a fournir au composant
 */
export class DatatableInfo {
    data:any[];
    fields:DatatableField[];
    action:string;
    limit:number;
    page:number;
    search:string;
    limits:number[];
}