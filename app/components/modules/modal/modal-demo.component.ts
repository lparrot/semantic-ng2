import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { NotificationService } from "../../../../src/services/notification/notification.service";

@Component({
    selector: 'modal-demo',
    templateUrl: `/app/components/modules/modal/modal-demo.component.html`,
    directives: [ SMT_DIRECTIVES ]
})
export class ModalDemoComponent {

    constructor(private notification:NotificationService) {
    }

    approveEvent(event) {
        this.notification.showInfo("Fired : approveEvent");
    }

    denyEvent(event) {
        this.notification.showInfo("Fired : denyEvent");
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