import { Component, Input, HostBinding } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: '[smt-icon]',
    template: ``
})
export class IconComponent {

    initialized:boolean;

    @HostBinding('class') classes:string;

    @Input("smt-icon") value:string;

    constructor() {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "icon" ]);
        classUtil.addClass(this.value);
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}
