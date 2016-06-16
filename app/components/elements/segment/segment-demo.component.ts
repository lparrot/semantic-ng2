import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { SHARED_DIRECTIVES } from "../../shared/index";
import { ConstUtil } from "../../../../src/core/util/const.util";

@Component({
    selector: 'segment-demo',
    templateUrl: `/app/components/elements/segment/segment-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ]
})
export class SegmentDemoComponent {

    public lists:Object;

    constructor() {
        this.lists = {
            color: ConstUtil.COLOR_LIST
        }
    }

}