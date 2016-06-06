import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { SHARED_DIRECTIVES } from "../../shared/index";

@Component({
    selector: 'menu-demo',
    templateUrl: `/app/components/collections/menu/menu-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ]
})
export class MenuDemoComponent {

    constructor() {
    }

}