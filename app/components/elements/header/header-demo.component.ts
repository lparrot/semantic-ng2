import { Component } from "@angular/core";
import { SMT_DIRECTIVES, SMT_PIPES } from "../../../../src/index";
import { SHARED_DIRECTIVES } from "../../shared/index";
import { ConstUtil } from "../../../../src/core/util/const.util";

@Component({
    selector: 'header-demo',
    templateUrl: `/app/components/elements/header/header-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ],
    pipes: [ SMT_PIPES ]
})
export class HeaderDemoComponent {

    public lists:{};

    constructor() {
        this.lists = {
            color: ConstUtil.COLOR_LIST
        }
    }

}