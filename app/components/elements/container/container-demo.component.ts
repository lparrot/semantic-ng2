import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { SHARED_DIRECTIVES } from "../../shared/index";

@Component({
    selector: 'container-demo',
    templateUrl: `/app/components/elements/container/container-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ]
})
export class ContainerDemoComponent {

    constructor() {
    }

}