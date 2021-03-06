import { Component, Input, HostBinding } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { ConstUtil } from "../../core/util/const.util";

@Component({
    selector: '[smt-icon]',
    template: ``
})
export class IconComponent {

    static rotateList:string[] = [ "flip", "left", "right" ];

    initialized:boolean;

    @HostBinding('class') classes:string;

    @Input() bordered:boolean;

    @Input() circular:boolean;

    @Input() color:string;

    @Input() corner:boolean;

    @Input() disabled:boolean;

    @Input() fitted:boolean;

    @Input() inverted:boolean;

    @Input() loading:boolean;

    @Input() link:boolean;

    @Input() rotate:string;

    @Input() size:string;

    @Input("smt-icon") value:string;

    constructor() {
    }

    ngAfterViewInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "icon" ]);
        classUtil.addClass(this.value);
        if (ClassUtil.controlValues(ConstUtil.SIZE_LIST, "size", this.size)) {
            classUtil.addClass(this.size);
        }
        if (ClassUtil.controlValues(ConstUtil.COLOR_LIST, "color", this.color)) {
            classUtil.addClass(this.color);
        }
        classUtil.addClassIfTrue(this.bordered, "bordered");
        classUtil.addClassIfTrue(this.circular, "circular");
        classUtil.addClassIfTrue(this.disabled, "disabled");
        classUtil.addClassIfTrue(this.inverted, "inverted");
        classUtil.addClassIfTrue(this.loading, "loading");
        classUtil.addClassIfTrue(this.fitted, "fitted");
        classUtil.addClassIfTrue(this.link, "link");
        classUtil.addClassIfTrue(this.corner, "corner");

        if (ClassUtil.controlValues(IconComponent.rotateList, "rotate", this.rotate)) {
            if (this.rotate == 'flip') {
                classUtil.addClasses([ "vertically", "flipped" ]);
            } else if (this.rotate == "left") {
                classUtil.addClasses([ "counterclockwise", "rotated" ]);
            } else if (this.rotate == "right") {
                classUtil.addClasses([ "clockwise", "rotated" ]);
            }
        }
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}
