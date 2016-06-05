import { Component, HostBinding, Input, EventEmitter, Output } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

@Component({
    selector: 'smt-checkbox-radio-list',
    template: `<ng-content></ng-content>`
})
export class CheckboxListComponent {

    initialized:boolean;

    @HostBinding('class') classes:string;

    @Input() name:string;

    @Input() model:any;

    @Output() modelChange:EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "checkbox-list", "fields" ]);
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}

