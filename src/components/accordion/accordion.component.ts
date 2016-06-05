import { Component, ElementRef, Input, HostBinding, EventEmitter, Output } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";

declare var jQuery:any;

@Component({
    selector: 'smt-accordion',
    template: `
        <ng-content select="smt-accordion, smt-accordion-item"></ng-content>`
})
export class AccordionComponent {

    initialized:boolean;

    root:boolean;

    @HostBinding('class') classes:string;

    @Input() animateChildren:boolean = true;

    @Input() collapsible:boolean = true;

    @Input() exclusive:boolean = true;

    @Input() on:string = 'click';

    @Input() field:boolean;

    @Input() fluid:boolean;

    @Input() inverted:boolean;

    @Input() styled:boolean = false;

    @Output() changeEvent:EventEmitter<any> = new EventEmitter();

    @Output() closeEvent:EventEmitter<any> = new EventEmitter();

    @Output() closingEvent:EventEmitter<any> = new EventEmitter();

    @Output() openEvent:EventEmitter<any> = new EventEmitter();

    @Output() openingEvent:EventEmitter<any> = new EventEmitter();

    constructor(private elementRef:ElementRef) {
    }

    ngOnChanges(changes) {
        if (!this.initialized) {
            this.root = jQuery(this.elementRef.nativeElement).parents('smt-accordion').length == 0;
        }
        let classUtil = new ClassUtil(this.root ? [ "ui", "accordion" ] : [ "accordion" ]);
        if (this.root) {
            classUtil.addClass("dis-block");
        }
        classUtil.addClassIfTrue(this.inverted, "inverted");
        if (!this.inverted) {
            classUtil.addClassIfTrue(this.styled, "styled");
        }
        classUtil.addClassIfTrue(this.fluid, "fluid");
        classUtil.addClassIfTrue(this.field, "field");
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (!this.initialized) {
                this.ngOnChanges(null);
            }
            let options = {
                animateChildren: this.animateChildren,
                collapsible: this.collapsible,
                exclusive: this.exclusive,
                closeNested: false,
                on: this.on,
                onChange: () => this.changeEvent.emit(this),
                closeEvent: () =>this.closeEvent.emit(this),
                onClosing: () => this.closingEvent.emit(this),
                onOpen: () => this.openEvent.emit(this),
                onOpening: () => this.openingEvent.emit(this)
            };
            if (this.root) {
                jQuery(this.elementRef.nativeElement).accordion(options);
            }
        });
    }

    /**
     * Closes accordion content at index
     * @param index
     */
    close(index:number) {
        jQuery(this.elementRef.nativeElement).accordion('close', index);
    }

    /**
     * Closes accordion content that are not active
     */
    closeOthers() {
        jQuery(this.elementRef.nativeElement).accordion('close others');
    }

    /**
     * Opens accordion content at index
     * @param index
     */
    open(index:number) {
        jQuery(this.elementRef.nativeElement).accordion('open', index);
    }

    /**
     * Refreshes all cached selectors and data
     */
    refresh() {
        jQuery(this.elementRef.nativeElement).accordion('refresh');
    }

    /**
     * Toggles accordion content at index
     * @param index
     */
    toggle(index:number) {
        jQuery(this.elementRef.nativeElement).accordion('toggle', index);
    }

}
