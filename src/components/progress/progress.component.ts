import { Component, HostBinding, ElementRef, EventEmitter, Output, Input } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { ConstUtil } from "../../core/util/const.util";

declare var jQuery:any;

@Component({
    selector: 'smt-progress',
    template: `
        <div class="bar">
            <div *ngIf="withProgress" class="progress"></div>
        </div>
        <div *ngIf="label" class="label">{{label}}</div>`
})
export class ProgressComponent {

    static attachedList:string[] = [ "top", "bottom" ];

    static stateList:string[] = [ "disabled", "success", "warning", "error" ];

    initialized:boolean;

    options:any = {};

    @HostBinding('class') classes:string;

    @Input() attached:string;

    @Input() autoSuccess:boolean = true;

    @Input() color:string;

    @Input() indicating:boolean;

    @Input() inverted:boolean;

    @Input() label:string;

    @Input() labelSuccess:string;

    @Input() limitValues:boolean = true;

    @Input() random:any = { min: 1, max: 20 };

    @Input() showActivity:boolean = true;

    @Input() size:string;

    @Input() state:string;

    @Input() total:number = 100;

    @Input() withProgress:boolean = true;

    @Input() value:number = 0;

    @Output() valueChange:EventEmitter<any> = new EventEmitter();

    @Output() activeEvent:EventEmitter<any> = new EventEmitter();

    @Output() changeEvent:EventEmitter<any> = new EventEmitter();

    @Output() errorEvent:EventEmitter<any> = new EventEmitter();

    @Output() successEvent:EventEmitter<any> = new EventEmitter();

    @Output() warningEvent:EventEmitter<any> = new EventEmitter();

    constructor(private elementRef:ElementRef) {
    }

    ngOnInit() {
        this.options.onChange = () => this.changeEvent.emit(this);
        this.options.onSuccess = () => this.successEvent.emit(this);
        this.options.onActive = () => this.activeEvent.emit(this);
        this.options.onError = () => this.errorEvent.emit(this);
        this.options.onWarning = () => this.warningEvent.emit(this);
    }

    ngAfterViewInit() {
        this.updateProgress();
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "progress" ]);
        classUtil.addClassIfTrue(this.indicating, "indicating");
        classUtil.addClassIfTrue(this.inverted, "inverted");

        if (ClassUtil.controlValues(ProgressComponent.stateList, "state", this.state)) {
            classUtil.addClass(this.state);
        }

        if (ClassUtil.controlValues(ConstUtil.SIZE_LIST, "size", this.size)) {
            classUtil.addClass(this.size);
            if (this.size == "tiny" || this.size == "small") {
                this.withProgress = false;
            }
        }

        if (ClassUtil.controlValues(ConstUtil.COLOR_LIST, "color", this.color)) {
            classUtil.addClass(this.color);
        }

        if (ClassUtil.controlValues(ProgressComponent.attachedList, "attached", this.attached)) {
            classUtil.addClasses([ this.attached, "attached" ]);
            this.withProgress = false;
        }

        if (this.value) {
            if (this.value < 0) {
                this.value = 0;
            }
            if (this.value > this.total) {
                this.value = this.total;
            }
        }

        this.valueChange.emit(this.value);

        this.options.value = this.value;
        this.options.total = this.total;
        this.options.autoSuccess = this.autoSuccess;
        this.options.showActivity = this.showActivity;
        this.options.limitValues = this.limitValues;
        this.options.text = {
            active: this.label || "{percent}%",
            success: this.labelSuccess
        };

        // Let ngAfterViewInit method take the first instanciation of progress
        if (this.initialized == true) {
            this.updateProgress();
        }

        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

    increment() {
        jQuery(this.elementRef.nativeElement).progress('increment');
    }

    private updateProgress() {
        jQuery(this.elementRef.nativeElement).progress(this.options);
    }

}

