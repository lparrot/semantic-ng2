import { Component, HostBinding, Input } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: '[smt-flag]',
    template: ``
})
export class FlagComponent {

    initialized:boolean;

    @HostBinding('class') classes:string;

    @Input("smt-flag") value:string;

    constructor() {
    }

    ngAfterViewInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "flag" ]);
        classUtil.addClass(this.value);
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}