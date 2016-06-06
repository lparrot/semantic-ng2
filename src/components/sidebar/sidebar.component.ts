import { Component, ElementRef, Input, OnChanges, HostBinding, ContentChild, forwardRef, Output, EventEmitter } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { MenuComponent } from "../menu/menu.component";

declare var jQuery:any;

jQuery.fn.fixSidebar = function () {
    let allModules = jQuery(this);
    allModules.each(function () {
        let selector = { pusher: '.pusher' },
            module = jQuery(this),
            context = jQuery('body');
        if (module.nextAll(selector.pusher).length === 0) {
            module.detach().prependTo(context);
        }
    });
    return this;
};

@Component({
    selector: 'smt-sidebar',
    template: `<ng-content></ng-content>`
})
export class SidebarComponent implements OnChanges {

    initialized:boolean;

    menuClasses:string[];

    @ContentChild(forwardRef(() => MenuComponent)) menu:MenuComponent;

    @HostBinding('class') classes:string;

    @Input() closable:boolean = true;

    @Input() dimmable:boolean = true;

    @Input() exclusive:boolean;

    @Input() position:string;

    @Input() scrollLock:boolean;

    @Input() showOnLoad:boolean;

    @Input() transition:string = "overlay";

    @Output() changeEvent:EventEmitter<any> = new EventEmitter();

    @Output() hiddenEvent:EventEmitter<any> = new EventEmitter();

    @Output() hideEvent:EventEmitter<any> = new EventEmitter();

    @Output() showEvent:EventEmitter<any> = new EventEmitter();

    @Output() visibleEvent:EventEmitter<any> = new EventEmitter();

    constructor(private elementRef:ElementRef) {
    }

    ngOnChanges(changes) {
        setTimeout(() => {
            let classUtil = new ClassUtil([ "ui", "sidebar" ]);
            classUtil.addClass(this.position);
            if (this.menu) {
                this.menu.ngOnChanges(null);
                this.menuClasses = this.menu.classes.split(" ");
            }
            classUtil.addClasses(this.menuClasses);
            this.classes = classUtil.getStringClasses();
            this.initialized = true;
        });
    }

    ngAfterViewInit() {
        if (this.closable) {
            this.elementRef.nativeElement.addEventListener('click', (e) => this.toggle());
        }
        jQuery(this.elementRef.nativeElement).sidebar({
            exclusive: this.exclusive,
            closable: this.closable,
            dimPage: this.dimmable,
            scrollLock: this.scrollLock,
            useLegacy: 'auto',
            onVisible: () => this.visibleEvent.emit(this),
            onShow: () => this.showEvent.emit(this),
            onChange: () => this.changeEvent.emit(this),
            onHide: () => this.hideEvent.emit(this),
            onHidden: () => this.hiddenEvent.emit(this)
        });
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    /**
     * Adds stylesheet to page head to trigger sidebar animations
     */
    addBodyCSS() {
        jQuery(this.elementRef.nativeElement).sidebar('add body CSS');
    }

    /**
     * Returns direction of current sidebar
     * @returns {any}
     */
    getDirection() {
        return jQuery(this.elementRef.nativeElement).sidebar('get direction');
    }

    /**
     * Returns vendor prefixed transition end event
     * @returns {any}
     */
    getTransitionEvent() {
        return jQuery(this.elementRef.nativeElement).sidebar('get transition event');
    }

    /**
     * Hides sidebar
     */
    hide() {
        jQuery(this.elementRef.nativeElement).sidebar('hide');
    }

    /**
     * Returns whether sidebar is hidden
     * @returns {any}
     */
    isHidden() {
        return jQuery(this.elementRef.nativeElement).sidebar('is hidden');
    }

    /**
     * Returns whether sidebar is visible
     * @returns {any}
     */
    isVisible() {
        return jQuery(this.elementRef.nativeElement).sidebar('is visible');
    }

    /**
     * Returns page content to original position
     */
    pullPage() {
        jQuery(this.elementRef.nativeElement).sidebar('pull page');
    }

    /**
     * Pushes page content to be visible alongside sidebar
     */
    pushPage() {
        jQuery(this.elementRef.nativeElement).sidebar('push page');
    }

    /**
     * Removes any inline stylesheets for sidebar animation
     */
    removeBodyCSS() {
        jQuery(this.elementRef.nativeElement).sidebar('remove body CSS');
    }

    /**
     * Shows sidebar
     */
    show() {
        jQuery(this.elementRef.nativeElement).fixSidebar().sidebar('show');
    }

    /**
     * Toggles visibility of sidebar
     */
    toggle() {
        jQuery(this.elementRef.nativeElement).fixSidebar().sidebar("toggle");
    }
}