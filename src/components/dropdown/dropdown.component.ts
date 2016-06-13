import { Component, ElementRef, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

declare var jQuery:any;

@Component({
    selector: 'smt-dropdown',
    template: `
    <div #dropdown [ngClass]="classes">
        <input *ngIf="showInput()" type="hidden" [attr.name]="name || 'dropdown_menu'">
        <div class="text" [ngClass]="{'default' : selection && !inline}">{{placeholder}}</div>
        <i class="dropdown icon"></i>
        <div class="menu">
            <ng-content></ng-content>
        </div>
    </div>
    `
})
export class DropdownComponent {

    component:any;

    initialized:boolean;

    options:any = {};

    classes:string[];

    @Input() fluid:boolean;

    @Input() inline:boolean;

    @Input() multiple:boolean;

    @Input() name:string;

    @Input() placeholder:string;

    @Input() search:boolean;

    @Input() selection:boolean = true;

    @Input() value:any;

    @Output() valueChange:EventEmitter<any> = new EventEmitter();

    @ViewChild("dropdown") dropdown:ElementRef;

    constructor() {
        this.options.onChange = (value, text, choice) => {
            if (this.multiple) {
                this.value = value.split(",");
            } else {
                this.value = value;
            }
            this.valueChange.emit(this.value);
        };
        this.options.onRemove = (value, text, choice) => {
            this.value.splice(this.value.indexOf(value), 1);
            this.valueChange.emit(this.value);
            console.log(this.value);
        };
        if (!this.selection) {
            this.options.action = "select";
        }
    }

    ngAfterViewInit() {
        this.component = jQuery(this.dropdown.nativeElement);
        this.component.dropdown(this.options);
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui" ]);
        classUtil.addClassIfTrue(this.search, "search");
        classUtil.addClassIfTrue(this.inline, "inline");
        classUtil.addClassIfTrue(this.multiple, "multiple");
        classUtil.addClassIfTrue(this.selection, "selection");
        classUtil.addClassIfTrue(this.fluid, "fluid");
        classUtil.addClass("dropdown");
        this.classes = classUtil.getClasses();
        this.initialized = true;
    }

    private showInput() {
        return !this.inline;
    }

}

