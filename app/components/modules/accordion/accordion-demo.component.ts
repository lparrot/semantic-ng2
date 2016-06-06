import { Component } from "@angular/core";
import { SMT_DIRECTIVES } from "../../../../src/index";
import { NotificationService } from "../../../../src/services/notification/notification.service";
import { SHARED_DIRECTIVES } from "../../shared/index";

@Component({
    selector: 'accordion-demo',
    templateUrl: `/app/components/modules/accordion/accordion-demo.component.html`,
    directives: [ SMT_DIRECTIVES, SHARED_DIRECTIVES ]
})
export class AccordionDemoComponent {

    constructor(private notification:NotificationService) {
    }

    changeEvent(event) {
        this.notification.showInfo("Fired : changeEvent");
    }

    closingEvent(event) {
        this.notification.showInfo("Fired : closingEvent");
    }

    closeEvent(event) {
        this.notification.showInfo("Fired : closeEvent");
    }

    openEvent(event) {
        this.notification.showInfo("Fired : openEvent");
    }

    openingEvent(event) {
        this.notification.showInfo("Fired : openingEvent");
    }

}