import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { NotificationService } from "../../../../src/services/notification/notification.service";
import { SHARED_DIRECTIVES } from "../../shared/index";

@Component({
    selector: 'sidebar-demo',
    templateUrl: `/app/components/modules/sidebar/sidebar-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ]
})
export class SidebarDemoComponent {

    constructor(private notification:NotificationService) {
    }

    changeEvent(event) {
        this.notification.showInfo("Fired : changeEvent");
    }

    hiddenEvent(event) {
        this.notification.showInfo("Fired : hiddenEvent");
    }

    hideEvent(event) {
        this.notification.showInfo("Fired : hideEvent");
    }

    showEvent(event) {
        this.notification.showInfo("Fired : showEvent");
    }

    visibleEvent(event) {
        this.notification.showInfo("Fired : visibleEvent");
    }

}