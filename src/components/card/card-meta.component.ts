import { Component, HostBinding, Input } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: 'smt-card-meta',
    template: `<ng-content></ng-content>`
})
export class CardMetaComponent {

    static floatedList:string[] = [ "left", "right" ];

    initialized:boolean;

    @HostBinding("class") classes:string;

    @Input() floated:string;

    constructor() {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "meta", "dis-block" ]);
        if (ClassUtil.controlValues(CardMetaComponent.floatedList, "floated", this.floated)) {
            classUtil.addClasses([ this.floated, "floated" ]);
        }
        this.classes = classUtil.getStringClasses();
    }

}