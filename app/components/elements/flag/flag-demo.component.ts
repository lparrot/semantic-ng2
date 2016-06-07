import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { SHARED_DIRECTIVES } from "../../shared/index";

@Component({
    selector: 'flag-demo',
    templateUrl: `/app/components/elements/flag/flag-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ]
})
export class FlagDemoComponent {

    public flag:string;

    constructor() {
    }

}