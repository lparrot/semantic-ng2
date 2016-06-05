import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../src/index";

@Component({
    selector: 'home-demo',
    templateUrl: '/app/components/home/home-demo.component.html',
    directives: [ SMT_DIRECTIVES ]
})
export class HomeDemoComponent {

    constructor() {
    }

}