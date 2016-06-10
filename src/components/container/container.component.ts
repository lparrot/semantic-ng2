import { Component, HostBinding, Input } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { CoreUtil } from "../../core/util/core.util";

@Component({
    selector: 'smt-container',
    template: `<ng-content></ng-content>`
})
export class ContainerComponent {

    initialized:boolean;

    @HostBinding('class') classes:string;

    @Input() aligned:string;

    @Input() fluid:boolean;

    @Input() text:boolean;

    constructor() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (!this.initialized) {
                this.ngOnChanges(null);
            }
        })
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "container" ]);
        classUtil.addClassIfTrue(this.text, "text");
        if (!CoreUtil.isNaN(this.aligned)) {
            if (this.aligned == "justified") {
                classUtil.addClass("justified");
            } else {
                classUtil.addClasses([ this.aligned, "aligned" ]);
            }
        }
        classUtil.addClassIfTrue(this.fluid, "fluid");
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}

