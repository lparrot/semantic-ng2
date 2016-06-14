import { Component, HostBinding } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: '[smt-reveal-hidden]',
    template: `<ng-content></ng-content>`
})
export class RevealHiddenComponent {

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
            let classUtil = new ClassUtil([ "hidden", "content" ]);
            this.classes = classUtil.getStringClasses();
            this.initialized = true;
        })
    }

}

