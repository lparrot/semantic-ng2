import { Component, Input, OnChanges, EventEmitter, HostBinding, ElementRef } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { ConstUtil } from "../../core/util/const.util";

@Component({
    selector: 'smt-menu',
    template: `<ng-content></ng-content>`
})
export class MenuComponent implements OnChanges {

    static fittedValue:any[] = [ true, "horizontal", "vertical" ];

    initialized:boolean;

    initializationEvent:EventEmitter<any> = new EventEmitter();

    elementRef:ElementRef;

    @HostBinding('class') classes:string;

    @Input() color:string;

    @Input() compact:boolean;

    @Input() content:string = ".pusher";

    @Input() delimited:boolean = true;

    @Input() fitted:string;

    @Input() fixed:boolean;

    @Input() icon:boolean;

    @Input() inverted:boolean;

    @Input() labeled:boolean;

    @Input() vertical:boolean;

    private static FIXED_CLASS = "menu-fixed-top";

    constructor(elementRef:ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        let contentElement = document.querySelector(this.content);
        if (!contentElement) {
            throw new Error(`Element with selector ${this.content} is required.`);
        }
        if (this.fixed == true) {
            // Si le menu doit être fixe, alors on ajoute la classe CSS pour le menu fixe si elle n'existe pas déjà
            if (!contentElement.classList.contains(MenuComponent.FIXED_CLASS)) {
                contentElement.classList.add(MenuComponent.FIXED_CLASS);
            }
        }
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "menu" ]);
        classUtil.addClassIfTrue(this.inverted, "inverted");
        classUtil.addClassIfTrue(this.compact, "compact");
        classUtil.addClassIfTrue(this.vertical, "vertical");
        classUtil.addClassIfTrue(this.icon, "icon");
        classUtil.addClassIfTrue(this.labeled, "labeled");
        classUtil.addClassIfFalse(this.delimited, "borderless");

        if (ClassUtil.controlValues(ConstUtil.COLOR_LIST, "color", this.color)) {
            classUtil.addClass(this.color);
        }

        classUtil.addClassIfTrue(this.fixed, "fixed");

        if (ClassUtil.controlValues(MenuComponent.fittedValue, "fitted", this.fitted)) {
            classUtil.addClassIfTrue(this.fitted == 'horizontal', "horizontally");
            classUtil.addClassIfTrue(this.fitted == 'vertical', "vertically");
            classUtil.addClass("fitted");
        }

        this.classes = classUtil.getStringClasses();
        this.initialized = true;
        this.initializationEvent.emit(null);
    }

    setDisabled() {
        this.elementRef.nativeElement.style.display = "none";
    }
}