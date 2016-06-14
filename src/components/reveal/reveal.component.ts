import { Component, Input, HostBinding } from "@angular/core";
import { ClassUtil } from "../../core/util/class.util";
import { ConstUtil } from "../../core/util/const.util";

@Component({
    selector: 'smt-reveal',
    template: `
        <ng-content select="[smt-reveal-visible],[smt-reveal-hidden]"></ng-content>`
})
export class RevealComponent {

    static moveList:string[] = [ "up", "down", "left", "right" ];
    static rotateList:string[] = [ "left", "right" ];

    initialized:boolean;

    @HostBinding("class") classes:string;

    @Input() active:boolean;

    @Input() circular:boolean;

    @Input() fade:boolean;

    @Input() instant:boolean;

    @Input() move:string;

    @Input() rotate:string;

    @Input() size:string;

    constructor() {
    }

    ngAfterViewInit() {
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "reveal", "dis-block", "image" ]);
        classUtil.addClassIfTrue(this.active, "active");
        classUtil.addClassIfTrue(this.fade, "fade");
        classUtil.addClassIfTrue(this.circular, "circular");
        classUtil.addClassIfTrue(this.instant, "instant");
        if (ClassUtil.controlValues(ConstUtil.SIZE_LIST, "size", this.size)) {
            classUtil.addClass(this.size);
        }
        if (ClassUtil.controlValues(RevealComponent.moveList, "move", this.move)) {
            classUtil.addClasses([ "move", this.move ]);
        }
        if (ClassUtil.controlValues(RevealComponent.rotateList, "rotate", this.rotate)) {
            classUtil.addClasses([ "rotate", this.rotate ]);
        }
        this.classes = classUtil.getStringClasses();
        this.initialized = true;
    }

}
