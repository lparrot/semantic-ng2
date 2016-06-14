import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { SHARED_DIRECTIVES } from "../../shared/index";

@Component({
    selector: 'reveal-demo',
    templateUrl: `/app/components/elements/reveal/reveal-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ]
})
export class RevealDemoComponent {

    revealActive:boolean = false;

    constructor() {
    }

}