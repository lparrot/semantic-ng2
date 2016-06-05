import { Component, Input, ElementRef, HostBinding } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

declare var $:any;

@Component({
    selector: 'smt-card',
    template: `
        <ng-content select="smt-card-content, smt-card-image, smt-card-extra, [smt-button]"></ng-content>`
})
export class CardComponent {

    @HostBinding('class') classes:string;

    initialized:boolean;

    @Input() centered:boolean;

    @Input() color:string;

    @Input() image:string;

    @Input() link:boolean;

    constructor(private elementRef:ElementRef) {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "card" ]);
        classUtil.addClassIfTrue(this.centered, "centered");
        classUtil.addClass(this.color);
        classUtil.addClassIfTrue(this.link, "link");
        this.classes = classUtil.getStringClasses();
    }

}