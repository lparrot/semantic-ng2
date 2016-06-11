import { Input, OnChanges, HostBinding, HostListener, EventEmitter, Output, Component, ChangeDetectionStrategy } from "@angular/core";
import { CoreUtil } from "../../core/util/core.util";
import { SettingsService } from "../../services/settings.service";
import { HttpService } from "../../services/http.service";
import { IconComponent } from "../icon/icon.component";
import { ClassUtil } from "../../core/util/class.util";
import { ButtonApi } from "./model/button-api.model";
import { ConstUtil } from "../../core/util/const.util";

@Component({
    selector: '[smt-button]',
    template: `
        <i *ngIf="type == 'simple' && icon" smt-icon="{{icon}}"></i>
        <ng-content *ngIf="type == 'simple'"></ng-content>
        <span *ngIf="type == 'animated'">
            <div class="visible content">
                <ng-content select="visible"></ng-content>
            </div>
            <div class="hidden content">
                <ng-content select="hidden"></ng-content>
            </div>
        </span>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [ IconComponent ]
})
export class ButtonComponent implements OnChanges {

    static attachedList:any[] = [ true, "top", "bottom", "left", "right" ];

    static floatedList:string[] = [ "left", "right" ];

    static socialList:string[] = [ "facebook", "twitter", "google plus", "vk", "linkedin", "instagram", "youtube" ];

    initialized:boolean;

    type:string;

    @HostBinding('class.loading') @HostBinding('class.disabled')
    api_loading:boolean;

    @HostBinding('class') classes:string;

    @Input() active:boolean;

    @Input() animated:any;

    @Input() api:ButtonApi;

    @Input() attached:any;

    @Input() basic:boolean;

    @Input() color:string;

    @Input() circular:boolean;

    @Input() compact:boolean;

    @Input() disabled:boolean;

    @Input() floated:string;

    @Input() fluid:boolean;

    @Input() icon:string;

    @Input() inverted:boolean;

    @Input() iconOnly:boolean;

    @Input() labeled:any;

    @Input() loading:boolean;

    @Input() size:string;

    @Input() social:string;

    @Output() complete:EventEmitter<any> = new EventEmitter();

    constructor(private http:HttpService, private settings:SettingsService) {
    }

    ngOnInit() {
        if (!CoreUtil.isNaN(this.api)) {
            this.api.status = "start";
        }
        if (!this.initialized) {
            this.ngOnChanges(null);
        }
    }

    ngOnChanges(changes) {
        let classUtil = new ClassUtil([ "ui", "button" ]);
        classUtil.addClassIfTrue(this.disabled, "disabled");
        classUtil.addClassIfTrue(this.loading, "loading");
        classUtil.addClassIfTrue(this.active, "active");
        classUtil.addClassIfTrue(this.inverted, "inverted");
        classUtil.addClassIfTrue(this.basic, "basic");
        classUtil.addClassIfTrue(this.circular, "circular");
        classUtil.addClassIfTrue(this.fluid, "fluid");
        classUtil.addClassIfTrue(this.compact, "compact");

        if (ClassUtil.controlValues([ ...ConstUtil.COLOR_LIST, ...ConstUtil.EMPHASIS_LIST ], "color", this.color)) {
            classUtil.addClass(this.color);
        }
        if (ClassUtil.controlValues(ConstUtil.SIZE_LIST, "size", this.size)) {
            classUtil.addClass(this.size);
        }

        if (ClassUtil.controlValues(ButtonComponent.floatedList, "floated", this.floated)) {
            classUtil.addClasses([ this.floated, "floated" ]);
        }

        if (ClassUtil.controlValues(ButtonComponent.attachedList, "attached", this.attached)) {
            if (this.attached == true) {
                classUtil.addClass("attached");
            } else {
                classUtil.addClasses([ this.attached, "attached" ]);
            }
        }

        if (this.animated) {
            classUtil.addClassIfTrue(this.animated.vertical, "vertical");
            classUtil.addClass("animated");
            classUtil.addClassIfTrue(this.animated.fade, "fade");
        }

        if (this.labeled) {
            classUtil.addClassIfTrue(this.labeled.right, "right");
            classUtil.addClass("labeled");
        }

        if (ClassUtil.controlValues(ButtonComponent.socialList, "social", this.social)) {
            classUtil.addClass(this.social);
            this.icon = this.social;
        }

        classUtil.addClassIfTrue((!CoreUtil.isNaN(this.icon) && (this.iconOnly == true || !CoreUtil.isNaN(this.labeled))) || this.circular == true, "icon");

        this.classes = classUtil.getStringClasses();
        this.type = this.getType();
        this.initialized = true;
    }

    getType() {
        if (!CoreUtil.isNaN(this.animated)) {
            return "animated";
        }
        return "simple";
    }

    @HostListener('click', [ '$event' ])
    onClick(event) {
        if (event.target.classList.contains("disabled")) {
            event.preventDefault();
        } else {
            if (!CoreUtil.isNaN(this.api)) {
                this.api.status = "wait";
                this.api_loading = true;
                let _url:string = this.settings.getAction(this.api.action);
                this.http.get(_url, this.api.params).subscribe((res) => {
                    this.complete.emit({
                        event: event,
                        data: res
                    });
                    this.api.status = "completed";
                    this.api_loading = false;
                })
            }
        }
    }

}