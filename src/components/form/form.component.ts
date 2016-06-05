import { Component, HostBinding } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: '[smt-form]',
    template: `<ng-content></ng-content>`
})
export class FormComponent {

    initialized:boolean;

    @HostBinding('class') classes:string;

    constructor() {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "form" ]);
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}

