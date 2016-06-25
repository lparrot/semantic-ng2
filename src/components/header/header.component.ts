import { Component, HostBinding, Input, ElementRef, OnChanges, OnInit } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { ConstUtil } from "../../core/util/const.util";

declare var jQuery:any;

@Component({
    selector: '[smt-header]',
    template: `<ng-content></ng-content>`
})
export class HeaderComponent implements OnInit, OnChanges {

    static alignedList:string[] = [ "left", "right", "center", "justified" ];

    static attachedList:any[] = [ true, "top", "bottom" ];

    static floatList:string[] = [ "left", "right" ];

    static sizeList:string[] = [ "huge", "large", "medium", "small", "tiny" ];

    initialized:boolean;

    @HostBinding('class') classes:string;

    @Input() aligned:string;

    @Input() attached:any;

    @Input() block:boolean;

    @Input() color:string;

    @Input() disabled:boolean;

    @Input() dividing:boolean;

    @Input() float:string;

    @Input() icon:boolean;

    @Input() inverted:boolean;

    @Input() size:string;

    @Input() sub:boolean;

    constructor(private elementRef:ElementRef) {
    }

    ngOnInit() {
        if (!this.initialized) {
            this.ngOnChanges();
        }
    }

    ngOnChanges() {
        let classUtil = new ClassUtil([ "ui", "header" ]);
        classUtil.addClassIfTrue(this.icon, "icon");
        classUtil.addClassIfTrue(this.disabled, "disabled");
        classUtil.addClassIfTrue(this.dividing, "dividing");
        classUtil.addClassIfTrue(this.block, "block");
        classUtil.addClassIfTrue(this.inverted, "inverted");

        if (this.sub) {
            if (jQuery(this.elementRef.nativeElement).parents("[smt-header]").length > 0) {
                classUtil.removeClass("ui");
            }
            classUtil.addClass("sub");
        }

        if (ClassUtil.controlValues(HeaderComponent.alignedList, "aligned", this.aligned)) {
            classUtil.addClass(this.aligned);
            if (this.aligned != "justified") {
                classUtil.addClass("aligned");
            }
        }

        if (ClassUtil.controlValues(HeaderComponent.attachedList, "attached", this.attached)) {
            if (this.attached != true) {
                classUtil.addClass(this.attached);
            }
            classUtil.addClass("attached");
        }

        if (ClassUtil.controlValues(HeaderComponent.floatList, "float", this.float)) {
            classUtil.addClasses([ this.float, "floated" ]);
        }

        if (ClassUtil.controlValues(ConstUtil.COLOR_LIST, "color", this.color)) {
            classUtil.addClass(this.color);
        }

        if (ClassUtil.controlValues(HeaderComponent.sizeList, "size", this.size)) {
            classUtil.addClass(this.size);
        }

        classUtil.addClasses(this.elementRef.nativeElement.classList);
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}
