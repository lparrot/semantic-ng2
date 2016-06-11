import { Component, HostBinding, Input } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { CoreUtil } from "../../core/util/core.util";

@Component({
    selector: 'smt-modal-content',
    template: `
        <img *ngIf="image" class="image" [attr.src]="image">
        <ng-content></ng-content>`
})
export class ModalContentComponent {

    initialized:boolean;

    @HostBinding('class') classes:string;

    @Input() image:string;

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
        let classUtil = new ClassUtil([ "content" ]);
        classUtil.addClassIfTrue(!CoreUtil.isNaN(this.image), "image");
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}

