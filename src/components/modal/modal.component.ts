import { Component, HostBinding, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

declare var jQuery:any;

@Component({
    selector: '[smt-modal]',
    template: `<ng-content></ng-content>`
})
export class ModalComponent {

    initialized:boolean;

    @HostBinding("class") classes:string;

    @Input() basic:boolean;

    @Output() approveEvent:EventEmitter<any> = new EventEmitter();

    @Output() denyEvent:EventEmitter<any> = new EventEmitter();

    @Output() hiddenEvent:EventEmitter<any> = new EventEmitter();

    @Output() hideEvent:EventEmitter<any> = new EventEmitter();

    @Output() showEvent:EventEmitter<any> = new EventEmitter();

    @Output() visibleEvent:EventEmitter<any> = new EventEmitter();

    constructor(private elementRef:ElementRef) {
    }

    ngOnInit() {
        jQuery(this.elementRef.nativeElement).modal({
            onApprove: (element) => {
                this.approveEvent.emit({
                    element: element,
                    component: this
                })
            },
            onDeny: (element) => {
                this.denyEvent.emit({
                    element: element,
                    component: this
                })
            },
            onShow: () => {
                this.showEvent.emit({
                    component: this
                })
            },
            onVisible: () => {
                this.visibleEvent.emit({
                    component: this
                })
            },
            onHide: () => {
                this.hideEvent.emit({
                    component: this
                })
            },
            onHidden: () => {
                this.hiddenEvent.emit({
                    component: this
                })
            }
        });
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "modal" ]);
        classUtil.addClassIfTrue(this.basic, "basic");
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

    ngOnDestroy() {
        jQuery(this.elementRef.nativeElement).remove();
    }

    show() {
        jQuery(this.elementRef.nativeElement).modal('show');
    }

}

