import { Component, Input, HostBinding } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: 'smt-card-group',
    template: `
        <ng-content ng-content="[smt-card]"></ng-content>`
})
export class CardGroupComponent {

    @HostBinding('class') classes:string;

    initialized:boolean;

    @Input() doubling:boolean;

    @Input() link:boolean;

    @Input() number:number;

    @Input() stackable:boolean;

    constructor() {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "cards" ]);
        if (this.number) {
            classUtil.addNumericClass(this.number);
            classUtil.addClassIfTrue(this.doubling, "doubling");
            classUtil.addClassIfTrue(this.stackable, "stackable");
        }
        classUtil.addClassIfTrue(this.link, "link");
        this.classes = classUtil.getStringClasses();
    }

}