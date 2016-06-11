import { Component, HostBinding, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

declare var jQuery:any;

@Component({
    selector: 'smt-modal',
    template: `<ng-content select="smt-modal-header,smt-modal-content,smt-modal-action"></ng-content>`
})
export class ModalComponent {

    static sizeList:string[] = [ "large", "small" ];

    component:any;

    initialized:boolean;

    options:any = {};

    @HostBinding("class") classes:string;

    @Input() allowMultiple:boolean;

    @Input() autofocus:boolean = true;

    @Input() basic:boolean;

    @Input() closable:boolean;

    @Input() fullscreen:boolean;

    @Input() observeChanges:boolean;

    @Input() size:string;

    @Input() transition:string = "scale";

    @Output() approveEvent:EventEmitter<any> = new EventEmitter();

    @Output() denyEvent:EventEmitter<any> = new EventEmitter();

    @Output() hiddenEvent:EventEmitter<any> = new EventEmitter();

    @Output() hideEvent:EventEmitter<any> = new EventEmitter();

    @Output() showEvent:EventEmitter<any> = new EventEmitter();

    @Output() visibleEvent:EventEmitter<any> = new EventEmitter();

    constructor(private elementRef:ElementRef) {
        this.component = jQuery(this.elementRef.nativeElement);
    }

    ngOnInit() {
        this.options.onApprove = (element) => {
            this.approveEvent.emit({
                element: element,
                component: this
            })
        };
        this.options.onDeny = (element) => {
            this.denyEvent.emit({
                element: element,
                component: this
            })
        };
        this.options.onShow = () => {
            this.showEvent.emit({
                component: this
            })
        };
        this.options.onVisible = () => {
            this.visibleEvent.emit({
                component: this
            })
        };
        this.options.onHide = () => {
            this.hideEvent.emit({
                component: this
            })
        };
        this.options.onHidden = () => {
            this.hiddenEvent.emit({
                component: this
            })
        };
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "modal" ]);
        classUtil.addClassIfTrue(this.basic, "basic");
        classUtil.addClassIfTrue(this.fullscreen, "fullscreen");
        if (ClassUtil.controlValues(ModalComponent.sizeList, "size", this.size)) {
            classUtil.addClass(this.size);
        }
        this.options.autofocus = this.autofocus;
        this.options.allowMultiple = this.allowMultiple;
        this.options.closable = this.closable;
        this.options.observeChanges = this.observeChanges;
        this.options.transition = this.transition;
        this.component.modal(this.options);
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

    ngOnDestroy() {
        this.component.remove();
    }

    cacheSizes() {
        this.component.modal('cache sizes');
    }

    canFit() {
        return this.component.modal('can fit');
    }

    hide() {
        this.component.modal('hide');
    }

    hideAll() {
        this.component.modal('hide all');
    }

    hideDimmer() {
        this.component.modal('hide dimmer');
    }

    hideOthers() {
        this.component.modal('hide others');
    }

    isActive() {
        return this.component.modal('is active');
    }

    refresh() {
        this.component.modal('refresh');
    }

    setActive() {
        this.component.modal('set active');
    }

    show() {
        this.component.modal('show');
    }

    showDimmer() {
        this.component.modal('show dimmer');
    }

    toggle() {
        this.component.modal('toggle');
    }

}

