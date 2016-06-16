import { Component, Input, HostBinding, ElementRef } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { ConstUtil } from "../../core/util/const.util";

declare var jQuery:any;

@Component({
    selector: 'smt-segment',
    template: `<ng-content></ng-content>`
})
export class SegmentComponent {

    static alignList:string[] = [ "left", "right", "center" ];

    static attachedList:any[] = [ true, "top", "bottom" ];

    static emphasisList:any[] = [ "secondary", "tertiary" ];

    static floatedList:any[] = [ "left", "right" ];

    static paddedList:any[] = [ true, "very" ];

    static stackedList:any[] = [ true, "tall" ];

    initialized:boolean;

    @HostBinding("class") classes:string;

    @Input() attached:any;

    @Input() align:string;

    @Input() basic:boolean;

    @Input() circular:boolean;

    @Input() clearing:boolean;

    @Input() color:string;

    @Input() compact:boolean;

    @Input() disabled:boolean;

    @Input() floated:string;

    @Input() emphasis:string;

    @Input() inverted:boolean;

    @Input() loading:boolean;

    @Input() piled:boolean;

    @Input() padded:any;

    @Input() raised:boolean;

    @Input() stacked:any;

    @Input() vertical:boolean;

    constructor(private elementRef:ElementRef) {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        setTimeout(() => {
            let classUtil = new ClassUtil([ "ui", "segment" ]);

            if (!this.compact && !this.circular) {
                classUtil.addClass("dis-block");
            }

            classUtil.addClassIfTrue(this.inverted, "inverted");
            classUtil.addClassIfTrue(this.clearing, "clearing");
            classUtil.addClassIfTrue(this.raised, "raised");
            classUtil.addClassIfTrue(this.piled, "piled");
            classUtil.addClassIfTrue(this.vertical, "vertical");
            classUtil.addClassIfTrue(this.disabled, "disabled");
            classUtil.addClassIfTrue(this.loading, "loading");
            classUtil.addClassIfTrue(this.compact, "compact");
            classUtil.addClassIfTrue(this.circular, "circular");
            classUtil.addClassIfTrue(this.basic, "basic");

            if (ClassUtil.controlValues(SegmentComponent.alignList, "align", this.align)) {
                classUtil.addClasses([ this.align, "aligned" ]);
            }

            if (ClassUtil.controlValues(SegmentComponent.emphasisList, "emphasis", this.emphasis)) {
                classUtil.addClass(this.emphasis);
            }

            if (ClassUtil.controlValues(SegmentComponent.floatedList, "floated", this.floated)) {
                classUtil.addClasses([ this.floated, "floated" ]);
            }

            if (ClassUtil.controlValues(ConstUtil.COLOR_LIST, "color", this.color)) {
                classUtil.addClass(this.color);
            }

            if (ClassUtil.controlValues(SegmentComponent.paddedList, "padded", this.padded)) {
                if (this.padded != true) {
                    classUtil.addClass(this.padded);
                }
                classUtil.addClass("padded");
            }

            if (ClassUtil.controlValues(SegmentComponent.stackedList, "stacked", this.stacked)) {
                if (this.stacked != true) {
                    classUtil.addClass(this.stacked);
                }
                classUtil.addClass("stacked");
            }

            if (ClassUtil.controlValues(SegmentComponent.attachedList, "attached", this.attached)) {
                if (this.attached == true) {
                    classUtil.addClass("attached");
                } else {
                    classUtil.addClasses([ this.attached, "attached" ]);
                }
            }

            if (this.circular) {
                let component = jQuery(this.elementRef.nativeElement);
                component.height(component.width());
            }
            this.classes = classUtil.getStringClasses();
            this.initialized = true;
        });
    }

}

