import { Component, HostBinding, Input } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: 'smt-segment-group',
    template: `<ng-content></ng-content>`
})
export class SegmentGroupComponent {

    initialized:boolean;

    @HostBinding('class') classes:string;

    @Input() compact:boolean;

    @Input() horizontal:boolean;

    @Input() piled:boolean;

    @Input() raised:boolean;

    @Input() stacked:boolean;

    constructor() {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "segments" ]);
        if (!this.horizontal && !this.compact) {
            classUtil.addClass("dis-block");
        }
        classUtil.addClassIfTrue(this.horizontal, "horizontal");
        classUtil.addClassIfTrue(this.piled, "piled");
        classUtil.addClassIfTrue(this.raised, "raised");
        classUtil.addClassIfTrue(this.stacked, "stacked");
        classUtil.addClassIfTrue(this.compact, "compact");
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}

