import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { SHARED_DIRECTIVES } from "../../shared/index";
import { ConstUtil } from "../../../../src/core/util/const.util";

@Component({
    selector: 'icon-demo',
    templateUrl: `/app/components/elements/icon/icon-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ]
})
export class IconDemoComponent {

    public lists:Object;

    constructor() {
        this.lists = {
            color: ConstUtil.COLOR_LIST
        }
    }

}