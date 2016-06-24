import { Component, HostBinding, Input } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { ConstUtil } from "../../core/util/const.util";

@Component({
    selector: '[smt-image]',
    template: `<ng-content></ng-content>`
})
export class ImageComponent {

    initialized:boolean;

    @HostBinding('class') classes:string;

    @Input() avatar:boolean;

    @Input() circular:boolean;

    @Input() size:string;

    @Input() wireframe:boolean;

    constructor() {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "image" ]);
        classUtil.addClassIfTrue(this.avatar, "avatar");
        classUtil.addClassIfTrue(this.wireframe, "wireframe");
        classUtil.addClassIfTrue(this.circular, "circular");

        if (ClassUtil.controlValues(ConstUtil.SIZE_LIST, "size", this.size)) {
            classUtil.addClass(this.size);
        }

        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}

