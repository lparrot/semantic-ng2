import { Component, Input, HostBinding } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: 'smt-divider',
    template: ``
})
export class DividerComponent {

    @HostBinding('class') classes:string;

    initialized:boolean;

    @Input() hide:boolean;

    constructor() {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "divider", "dis-block" ]);
        classUtil.addClassIfTrue(this.hide, "hidden");
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}