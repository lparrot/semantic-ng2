import { Component, HostBinding, Input } from "@angular/core";
import { CoreUtil } from "../../core/util/core.util";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: '[smt-label]',
    template: `<ng-content></ng-content>`
})
export class LabelComponent {

    initialized:boolean;

    @HostBinding('class') classes:string;

    @Input() basic:boolean;

    @Input() color:string;

    @Input() pointing:any;

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
        classUtil.addClass(this.color);
        if (!CoreUtil.isNaN(this.pointing)) {
            classUtil.addClassIfTrue(this.pointing.direction == "left" || this.pointing.direction == 'right', this.pointing.direction);
            classUtil.addClass("pointing");
            classUtil.addClassIfTrue(this.pointing.direction == "below", this.pointing.direction);
        }
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}

