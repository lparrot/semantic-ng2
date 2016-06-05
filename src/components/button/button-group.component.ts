import { Component, Input, HostBinding, ChangeDetectionStrategy } from "@angular/core";
import { CoreUtil } from "../../core/util/core.util";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: 'smt-button-group',
    template: `
        <ng-content *ngIf="type == 'conditional'" select="[data-first]"></ng-content>
        <div *ngIf="type == 'conditional'" class="or" [attr.data-text]="conditional.orLabel ? conditional.orLabel : null"></div>
        <ng-content *ngIf="type == 'conditional'" select="[data-last]"></ng-content>
        
        <ng-content *ngIf="type == 'simple'" select="[smt-button]"></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonGroupComponent {

    @HostBinding('class') classes:string;

    initialized:boolean;

    type:string;

    @Input() basic:boolean;

    @Input() color:string;

    @Input() conditional:any;

    @Input() icon:boolean;

    @Input() labeled:boolean;

    @Input() number:number;

    @Input() size:string;

    @Input() vertical:boolean;

    constructor() {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "buttons" ]);
        classUtil.addClassIfTrue(this.icon, "icon");
        classUtil.addClassIfTrue(this.vertical, "vertical");
        classUtil.addClassIfTrue(this.labeled, "labeled");
        classUtil.addClassIfTrue(this.basic, "basic");
        classUtil.addClass(this.color);
        classUtil.addClass(this.size);
        classUtil.addNumericClass(this.number);
        this.classes = classUtil.getStringClasses();
        this.type = this.getType();
        this.initialized = true;
    }

    getType() {
        if (!CoreUtil.isNaN(this.conditional)) {
            return "conditional";
        }
        return "simple";
    }

}
