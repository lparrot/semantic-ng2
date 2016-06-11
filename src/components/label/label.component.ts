import { Component, HostBinding, Input } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { ConstUtil } from "../../core/util/const.util";

@Component({
    selector: '[smt-label]',
    template: `<ng-content></ng-content>`
})
export class LabelComponent {

    static pointingList:any[] = [ true, "left", "right", "below" ];

    initialized:boolean;

    @HostBinding('class') classes:string;

    @Input() basic:boolean;

    @Input() color:string;

    @Input() pointing:string;

    constructor() {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "label" ]);
        classUtil.addClassIfTrue(this.basic, "basic");
        if (ClassUtil.controlValues(ConstUtil.COLOR_LIST, "color", this.color)) {
            classUtil.addClass(this.color);
        }
        if (ClassUtil.controlValues(LabelComponent.pointingList, "pointing", this.pointing)) {
            classUtil.addClassIfTrue(this.pointing == "left" || this.pointing == 'right', this.pointing);
            classUtil.addClass("pointing");
            classUtil.addClassIfTrue(this.pointing == "below", this.pointing);
        }
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}

