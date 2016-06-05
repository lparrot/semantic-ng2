import { Component, Input, HostBinding } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { CoreUtil } from "../../core/util/core.util";

@Component({
    selector: '[smt-segment]',
    template: `<ng-content></ng-content>`
})
export class SegmentComponent {

    initialized:boolean;

    @HostBinding("class") classes:string;

    @Input() attached:any;

    @Input() clearing:boolean;

    @Input() inverted:boolean;

    constructor() {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "segment" ]);
        classUtil.addClassIfTrue(this.inverted, "inverted");
        classUtil.addClassIfTrue(this.clearing, "clearing");
        if (!CoreUtil.isNaN(this.attached)) {
            if (this.attached == true) {
                classUtil.addClass("attached");
            } else {
                classUtil.addClasses([ this.attached, "attached" ]);
            }
        }
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}

