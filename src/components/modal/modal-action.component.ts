import { Component, HostBinding } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: 'smt-modal-action',
    template: `<ng-content></ng-content>`
})
export class ModalActionComponent {

    initialized:boolean;

    @HostBinding('class') classes:string;

    constructor() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (!this.initialized) {
                this.ngOnChanges(null);
            }
        });
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "actions", "dis-block" ]);
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}

