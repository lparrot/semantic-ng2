import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { NotificationService } from "../../../../src/services/notification/notification.service";
import { SHARED_DIRECTIVES } from "../../shared/index";

@Component({
    selector: "sidebar-demo",
    templateUrl: `/app/components/modules/sidebar/sidebar-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ]
})
export class SidebarDemoComponent {

    public position:string = "left";
    public transition:string = "overlay";
    public events:boolean = false;

    constructor(private notification:NotificationService) {
    }

    activeEvents(active:boolean) {
        this.events = active;
    }

    changeEvent(event) {
        if (this.events) {
            this.notification.showInfo("Fired : changeEvent");
        }
    }

    hiddenEvent(event) {
        if (this.events) {
            this.notification.showInfo("Fired : hiddenEvent");
        }
    }

    hideEvent(event) {
        if (this.events) {
            this.notification.showInfo("Fired : hideEvent");
        }
    }

    isVertical() {
        return this.position == "left" || this.position == "right";
    }

    selectPosition(position:string) {
        this.position = position;
    }

    selectTransition(transition:string) {
        this.transition = transition;
    }

    showEvent(event) {
        if (this.events) {
            this.notification.showInfo("Fired : showEvent");
        }
    }

    visibleEvent(event) {
        if (this.events) {
            this.notification.showInfo("Fired : visibleEvent");
        }
    }

}