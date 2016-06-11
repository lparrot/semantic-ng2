import { Component, Input } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { ConstUtil } from "../../core/util/const.util";

@Component({
    selector: 'smt-icon-group',
    template: `<i [ngClass]="classes"><ng-content></ng-content></i>`
})
export class IconGroupComponent {

    initialized:boolean;

    classes:string[];

    @Input() size:string;

    constructor() {
    }

    ngAfterViewInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "icons" ]);
        if (ClassUtil.controlValues(ConstUtil.SIZE_LIST, "size", this.size)) {
            classUtil.addClass(this.size);
        }
        this.classes = classUtil.getClasses();
        this.initialized = true;
    }

}

