import { Component, HostBinding } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: '[smt-reveal-visible]',
    template: `<ng-content></ng-content>`
})
export class RevealVisibleComponent {

    initialized:boolean;

    @HostBinding('class') classes:string;

    constructor() {
    }

    ngAfterViewInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        setTimeout(()=> {
            let classUtil = new ClassUtil([ "visible", "content" ]);
            this.classes = classUtil.getStringClasses();
            this.initialized = true;
        })
    }

}

