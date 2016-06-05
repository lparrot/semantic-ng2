import { Pipe, PipeTransform } from "@angular/core";

declare var _:any;

@Pipe({
    name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

    transform(value:any, ...args):any {
        return _.capitalize(value);
    }
}