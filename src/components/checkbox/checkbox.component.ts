import { Component, HostBinding, Input, Output, EventEmitter, Injector, ElementRef, ViewChild } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { CoreUtil } from "../../core/util/core.util";
import { CheckboxListComponent } from "./checkbox-list.component";

declare var jQuery:any;

@Component({
    selector: 'smt-checkbox',
    template: `
        <div #container [ngClass]="classes">
          <input [attr.type]="radio ? 'radio' : 'checkbox'" [attr.name]="parent ? parent.name : name" type="checkbox" [ngModel]="model" (ngModelChange)="onChange($event)">
          <label>{{label}}</label>
        </div>`
})
export class CheckboxComponent {

    initialized:boolean;

    options:any = {};

    parent:CheckboxListComponent;

    @HostBinding('class') classes:string;

    @Input() checkboxStyle:string;

    @Input() label:string;

    @Input() model:any;

    @Input() name:string;

    @Input() radio:boolean;

    @Input() value:any;

    @Output() modelChange:EventEmitter<any> = new EventEmitter();

    @Output() beforeCheckedEvent:EventEmitter<any> = new EventEmitter();

    @Output() beforeDeterminateEvent:EventEmitter<any> = new EventEmitter();

    @Output() beforeIndeterminateEvent:EventEmitter<any> = new EventEmitter();

    @Output() beforeUncheckedEvent:EventEmitter<any> = new EventEmitter();

    @Output() changeEvent:EventEmitter<any> = new EventEmitter();

    @Output() checkedEvent:EventEmitter<any> = new EventEmitter();

    @Output() determinateEvent:EventEmitter<any> = new EventEmitter();

    @Output() disableEvent:EventEmitter<any> = new EventEmitter();

    @Output() enableEvent:EventEmitter<any> = new EventEmitter();

    @Output() indeterminateEvent:EventEmitter<any> = new EventEmitter();

    @Output() uncheckedEvent:EventEmitter<any> = new EventEmitter();

    @ViewChild("container") container:ElementRef;

    constructor(private elementRef:ElementRef, private injector:Injector) {
    }

    ngOnInit() {
        this.options.onChange = () => this.changeEvent.emit(this);
        this.options.onChecked = () => this.checkedEvent.emit(this);
        this.options.onIndeterminate = () => this.indeterminateEvent.emit(this);
        this.options.onDeterminate = () => this.determinateEvent.emit(this);
        this.options.onUnchecked = () => this.uncheckedEvent.emit(this);
        this.options.beforeChecked = () => this.beforeCheckedEvent.emit(this);
        this.options.beforeIndeterminate = () => this.beforeIndeterminateEvent.emit(this);
        this.options.beforeDeterminate = () => this.beforeDeterminateEvent.emit(this);
        this.options.beforeUnchecked = () => this.beforeUncheckedEvent.emit(this);
        this.options.onEnable = () => this.enableEvent.emit(this);
        this.options.onDisable = () => this.disableEvent.emit(this);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (!this.radio && !this.model) {
                this.emit(false);
            }
            if (!this.initialized) {
                this.ngOnChanges(null);
            }
            jQuery(this.container.nativeElement).checkbox(this.options);
        });
    }

    ngOnChanges(changes) {
        if (!this.initialized) {
            if (jQuery(this.elementRef.nativeElement).parents("smt-checkbox-radio-list").length > 0) {
                this.parent = this.injector.get(CheckboxListComponent);
                this.radio = true;
            }
        }

        let classUtil = new ClassUtil([ "ui", "checkbox" ]);
        classUtil.addClassIfTrue(this.radio, "radio");
        if (!this.radio) {
            classUtil.addClass(this.checkboxStyle);
        }
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

    onChange(event) {
        if (this.classes.indexOf("disabled") > -1) {
            event.preventDefault();
        } else {
            if (this.radio && !CoreUtil.isNaN(this.value)) {
                this.emit(this.value);
            } else {
                this.emit(event);
            }
        }
    }

    emit(value:any) {
        if (this.parent) {
            this.parent.modelChange.emit(value);
        } else {
            this.modelChange.emit(value);
        }
    }

}

